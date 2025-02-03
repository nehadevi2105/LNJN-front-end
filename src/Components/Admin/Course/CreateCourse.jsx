import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import APIClient from "../../../API/APIClient";
import apis from "../../../API/API.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const CreateCourse = () => {
  const [name, setCourseName] = useState("");
  const [did, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const [imgsrc, setFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all departments for dropdown
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await APIClient.get(apis.getDepartments);
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = "Please enter a course name";
    if (!did) errors.did = "Please select a department";
    if (!imgsrc) errors.imgsrc = "Please upload a file";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setConfirmDialogOpen(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.imgsrc[0]);
  };

  const handleConfirmSubmit = async () => {
    setConfirmDialogOpen(false);
    setLoading(true);

    const formData = new FormData();
    formData.append("courseName", name);
    formData.append("departmentId", did);
    formData.append("file", imgsrc);

    try {
      const response = await APIClient.post(apis.createCourse, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setTimeout(() => {
          setLoading(false);
          setSuccessDialogOpen(true);
          setCourseName("");
          setDepartmentId("");
          setFile(null);
        }, 1000);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error(error.response?.data || "Error submitting data");
      setLoading(false);
    }
  };

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle"></div>
        <div className="home">
          <div className="homeContainer">
            <Row className="vh-100 d-flex justify-content-center align-items-left">
              <Col md={10} lg={12} xs={12}>
                <Card>
                  <Card.Body>
                    <h2 className="fw-bold mb-4 text-center text-uppercase">Create Course</h2>
                    <Form onSubmit={handleSubmit}>
                      {/* Course Name */}
                      <Form.Group className="mb-3" controlId="courseName">
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Course Name"
                          value={name}
                          onChange={(e) => setCourseName(e.target.value)}
                          isInvalid={!!formErrors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.name}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Department Dropdown */}
                      <Form.Group className="mb-3" controlId="department">
                        <Form.Label>Department</Form.Label>
                        <Form.Select
                          value={did}
                          onChange={(e) => setDepartmentId(e.target.value)}
                          isInvalid={!!formErrors.did}
                        >
                          <option value="">Select Department</option>
                          {departments.map((dept) => (
                            <option key={dept.did} value={dept.did}>
                              {dept.dname}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {formErrors.did}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* File Upload */}
                      <Form.Group className="mb-3" controlId="fileUpload">
                        <Form.Label>Upload File</Form.Label>
                        <Form.Control
                          type="file"
                          onChange={handleFileChange}
                          isInvalid={!!formErrors.imgsrc}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.imgsrc}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Submit Button */}
                      <div className="d-flex justify-content-between">
                        <Button variant="primary" type="submit">Submit</Button>
                      </div>

                      {/* Loading Spinner */}
                      <Dialog open={loading}>
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </Dialog>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </main>

      <ToastContainer />

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Create</DialogTitle>
        <DialogContent>Are you sure you want to create this course?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleConfirmSubmit} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>Course created successfully!</DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialogOpen(false)} color="primary">OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateCourse;
