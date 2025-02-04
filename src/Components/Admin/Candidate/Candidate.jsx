import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import APIClient from "../../../API/APIClient";
import apis from "../../../API/API.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const Candidate = () => {
  // State for course name, description, department selection, and file upload
  const [name, setCourseName] = useState("");
  const [coursedetails, setCourseDescription] = useState("");
  const [deptid, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);
  const [imgsrc, setFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    const newData = {
      name,
      mobile,
      department,
      course,
      isView,
      isLoading,
    };
    setData([...data, newData]);
    // Clear the form fields
    setName('');
    setMobile('');
    setDepartment('');
    setCourse('');
    setIsView(false);
    setIsLoading(false);
  };

  // Fetch all departments for dropdown
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await APIClient.get(apis.getDepartments);
        const res = await APIClient.get(apis.getCourses);
        setDepartments(response.data);
        setCourseName(res.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = "Please enter a course name";
    if (!coursedetails.trim()) errors.coursedetails = "Please enter a course description";
    if (!deptid) errors.deptid = "Please select a department";
    if (!imgsrc) errors.imgsrc = "Please upload a file";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setConfirmDialogOpen(true);
  };

  // Corrected file change handler using e.target.files
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleConfirmSubmit = async () => {
    setConfirmDialogOpen(false);
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("coursedetails", coursedetails);
    formData.append("deptid", deptid); // using deptid instead of did
    formData.append("imgsrc", imgsrc);

    try {
        debugger;
      const response = await APIClient.post(apis.createCourse, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setTimeout(() => {
          setLoading(false);
          setSuccessDialogOpen(true);
          // Reset form values after success
          setCourseName("");
          setCourseDescription("");
          setDepartmentId("");
          setFile(null);
        }, 1000);
      } else {
        toast.error("Something went wrong");
        setLoading(false);
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
                    <h2 className="fw-bold mb-4 text-center text-uppercase">Create Candidate</h2>
                    <Form onSubmit={handleSubmit}>
                    <Row>
                    <Col>
                      {/* Course Name */}
                      <Form.Group className="mb-3" controlId="name">
                        <Form.Label> Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Candidate Name"
                          //value={name}
                          onChange={(e) => setCourseName(e.target.value)}
                          isInvalid={!!formErrors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                     
                      </Col>
                      <Col>
                      <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Mobile No</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Mobile no"
                         // value={name}
                          onChange={(e) => setCourseName(e.target.value)}
                          isInvalid={!!formErrors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                      </Col>
                      </Row>
                      <Row>
                      <Col>
                      <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Email"
                         // value={name}
                          onChange={(e) => setCourseName(e.target.value)}
                          isInvalid={!!formErrors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                      </Col>
                      <Col>
                      <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Aadhar </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Aadhar"
                        //  value={name}
                          onChange={(e) => setCourseName(e.target.value)}
                          isInvalid={!!formErrors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                      </Col>
                      </Row>
                    
<Row>
    <Col>

                      {/* Department Dropdown */}
                      <Form.Group className="mb-3" controlId="department">
                        <Form.Label>Department</Form.Label>
                        <Form.Select
                          value={deptid}
                          onChange={(e) => setDepartmentId(e.target.value)}
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
                    </Col>
                    <Col>

                      <Form.Group className="mb-3" controlId="department">
                        <Form.Label>Course</Form.Label>
                        <Form.Select
                          value={deptid}
                          onChange={(e) => setDepartmentId(e.target.value)}
                          isInvalid={!!formErrors.deptid}
                        >
                          <option value="">Select Course</option>
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
</Col>
</Row>

<Row    >
    <Col>
                     {/* Checkbox */}
 <Form.Group className="mb-3" controlId="Isview">
    <Form.Check
        type="checkbox"
        label="Isview"
        //checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
    />
</Form.Group>
</Col>
<Col>
<Form.Group className="mb-3" controlId="Isdownloading">
    <Form.Check
        type="checkbox"
        label="Isdownloading"
        //checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
    />
</Form.Group>
</Col>
</Row>
<Row className="mt-3">
    <Col>
 {/* Add Button */}
 <div className="d-flex justify-content-between">
                        <Button variant="primary" onClick={handleAdd}>
                          Add
                        </Button>
                      </div>
                      </Col>
                     
                        <Col>
                      {/* Submit Button */}
                      <div className="d-flex justify-content-between">
                        <Button variant="primary" onClick={handleSubmit}>
                          Submit
                        </Button>
                      </div>
</Col>
</Row>

{/* 
<Row className="mt-3">
        <Col>
          <Table >
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile No</th>
                <th>Department</th>
                <th>Course</th>
                <th>Is View</th>
                <th>Is Loading</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.mobile}</td>
                  <td>{item.department}</td>
                  <td>{item.course}</td>
                  <td>{item.isView ? 'Yes' : 'No'}</td>
                  <td>{item.isLoading ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row> */}


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
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>Course created successfully!</DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialogOpen(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Candidate;
