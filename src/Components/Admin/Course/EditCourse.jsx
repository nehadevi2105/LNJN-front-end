import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';
import APIClient from "../../../API/APIClient";
import apis from "../../../API/API.json";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { Row } from 'react-bootstrap/esm';

export const EditCourse = () => {
  const { id } = useParams();
  const [formErrors, setFormErrors] = useState({});
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    coursedetails: '',
    deptid: '',
    coursefilepath1: '',  // File upload field
  });
  const [departments, setDepartments] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await APIClient.get(`${apis.getCourses}/${id}`)
        console.log("Fetched Course Data:", response.data);  // Debugging

        if (response.data) {
          setFormData((prevState) => ({
            ...prevState,
            name: response.data.name || '',
            coursedetails: response.data.coursedetails || '',
            deptid: response.data.deptid || '',
            coursefilepath1: response.data.coursefilepath1 || '', 
          }));

          console.log("form Data:", formData);  // Debugging 
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        toast.error('Failed to load course data');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // Fetch all departments for dropdown
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await APIClient.get(apis.getDepartments);
        setDepartments(response.data || []);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      coursefilepath1: event.target.files[0],
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Course name is required';
    if (!formData.coursedetails.trim()) errors.coursedetails = 'Course description is required';
    if (!formData.deptid) errors.deptid = 'Please select a department';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setConfirmDialogOpen(true);
    }
  };

  const handleUpdateConfirm = async () => {
    setConfirmDialogOpen(false);
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("coursedetails", formData.coursedetails);
    formDataToSend.append("deptid", formData.deptid);
    if (formData.coursefilepath1) {
      formDataToSend.append("coursefile", formData.coursefilepath1);
    }

    try {
      const response = await APIClient.post(`${apis.editCourse}/${id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setTimeout(() => {
          setLoading(false);
          setSuccessDialogOpen(true);
        }, 1000);
      } else {
        toast.error('Failed to update course');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error updating course:', error);
      toast.error('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <main id="main" className="main">
          <div className="pagetitle"></div>
          <div className="home">
            <div className="homeContainer">
              <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-left">
                  <Col md={10} lg={12} xs={12}>
                    <Card>
                      <Card.Body>
                        <h2 className="fw-bold mb-4 text-center text-uppercase">Edit Course</h2>
                        <Link to="/Course/AllCourse">
                          <button type="button" className="btn btn-info">Back</button>
                        </Link>
                        
                        {/* Show Spinner while loading */}
                        {loading ? (
                          <div className="d-flex justify-content-center">
                            <Spinner animation="border" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </Spinner>
                          </div>
                        ) : (
                          <Form onSubmit={handleSubmit}>
                            {/* Course Name */}
                            <Form.Group className="mb-3" controlId="name">
                              <Form.Label>Course Name</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter Course Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                isInvalid={!!formErrors.name}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formErrors.name}
                              </Form.Control.Feedback>
                            </Form.Group>

                            {/* Course Description */}
                            <Form.Group className="mb-3" controlId="coursedetails">
                              <Form.Label>Course Description</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter Course Description"
                                name="coursedetails"
                                value={formData.coursedetails}
                                onChange={handleChange}
                                isInvalid={!!formErrors.coursedetails}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formErrors.coursedetails}
                              </Form.Control.Feedback>
                            </Form.Group>

                            {/* Department Dropdown */}
                            <Form.Group className="mb-3" controlId="deptid">
                              <Form.Label>Department</Form.Label>
                              <Form.Select
                                name="deptid"
                                value={formData.deptid}
                                onChange={handleChange}
                                isInvalid={!!formErrors.deptid}
                              >
                                <option value="">Select Department</option>
                                {departments.map((dept) => (
                                  <option key={dept.did} value={dept.did}>
                                    {dept.dname}
                                  </option>
                                ))}
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                {formErrors.deptid}
                              </Form.Control.Feedback>
                            </Form.Group>

                            {/* File Upload */}

                            <Form.Group className="mb-3" controlId="coursefilepath1">
                              <Form.Label>Upload Course File</Form.Label>
                              <Form.Control
                                type="file"
                                 name="coursefilepath1"
                                // value={formData.coursefilepath1}
                                onChange={handleFileChange}
                              />
                            </Form.Group>

                            <div className="d-flex justify-content-between">
                              <Button variant="primary" type="submit">Submit</Button>
                            </div>
                          </Form>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default EditCourse;
