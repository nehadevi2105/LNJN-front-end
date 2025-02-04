import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row, Spinner, Table } from "react-bootstrap";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import APIClient from "../../../API/APIClient";
import apis from "../../../API/API.json";
import "react-toastify/dist/ReactToastify.css";

const Candidate = () => {
  // Candidate personal info
  const [candidateInfo, setCandidateInfo] = useState({
    name: "",
    mobileno: "",
    email: "",
    aadharno: ""
  });

  // Current course selection inputs
  const [courseSelection, setCourseSelection] = useState({
    deptid: "",
    courseid: "",
    view: false,
    download: false
  });

  // Array of added course selections
  const [candidateCourses, setCandidateCourses] = useState([]);

  // Options fetched from API
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);

  // Dialog states
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validation errors
  const [formErrors, setFormErrors] = useState({});

  // Fetch departments and courses on mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await APIClient.get(apis.getDepartments);
        setDepartments(response.data || []);
      } catch (error) {
        console.error("Error fetching departments:", error);
        toast.error("Error fetching departments");
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await APIClient.get(apis.getCourses);
        setCourses(response.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Error fetching courses");
      }
    };

    fetchDepartments();
    fetchCourses();
  }, []);

  // Handle candidate personal info change
  const handleCandidateChange = (e) => {
    const { name, value } = e.target;
    setCandidateInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle course selection change (for dropdowns and checkboxes)
  const handleCourseSelectionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourseSelection((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Validate candidate info (for example, required fields)
  const validateCandidateInfo = () => {
    const errors = {};
    if (!candidateInfo.name.trim()) errors.name = "Name is required";
    if (!candidateInfo.mobileno.trim()) errors.mobileno = "Mobile number is required";
    if (!candidateInfo.email.trim()) errors.email = "Email is required";
    if (!candidateInfo.aadharno.trim()) errors.aadharno = "Aadhar number is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate course selection before adding to table
  const validateCourseSelection = () => {
    const errors = {};
    if (!courseSelection.deptid) errors.deptid = "Please select a department";
    if (!courseSelection.courseid) errors.courseid = "Please select a course";
    // You can add more validations if needed.
    return Object.keys(errors).length === 0;
  };

  // Handle Add button click to add the current course selection to the table
  const handleAddCourse = () => {
    if (!validateCourseSelection()) {
      toast.error("Please fill in required course selection fields.");
      return;
    }
    setCandidateCourses((prev) => [...prev, courseSelection]);
    // Reset course selection (optional)
    setCourseSelection({
      deptid: "",
      courseid: "",
      view: false,
      download: false
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // First validate candidate info
    if (!validateCandidateInfo()) {
      toast.error("Please fill in all required candidate info fields.");
      return;
    }
    // You may also check that at least one course selection is added:
    if (candidateCourses.length === 0) {
      toast.error("Please add at least one course selection.");
      return;
    }
    // Open confirmation dialog
    setConfirmDialogOpen(true);
  };

  // When user confirms, send the data to backend
  const handleConfirmSubmit = async () => {
    setConfirmDialogOpen(false);
    setLoading(true);

    // Prepare payload: candidate personal info plus an array of course selections
    const payload = {
      ...candidateInfo,
      courses: candidateCourses
    };

    try {
      const response = await APIClient.post(apis.createCandidate, payload, {
        headers: { "Content-Type": "application/json" }
      });
      if (response.status === 200) {
        toast.success("Candidate created successfully!");
        setSuccessDialogOpen(true);
        // Optionally, reset the form
        setCandidateInfo({
          name: "",
          mobileno: "",
          email: "",
          aadharno: ""
        });
        setCandidateCourses([]);
      } else {
        toast.error("Failed to create candidate");
      }
    } catch (error) {
      console.error("Error submitting candidate data:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="my-4">
        <Card>
          <Card.Body>
            <h2 className="text-center text-uppercase mb-4">Candidate Registration</h2>
            <Form onSubmit={handleSubmit}>
              {/* Candidate Personal Info */}
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="candidateName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      name="name"
                      value={candidateInfo.name}
                      onChange={handleCandidateChange}
                      isInvalid={!!formErrors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="candidateMobile">
                    <Form.Label>Mobile No.</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter mobile number"
                      name="mobileno"
                      value={candidateInfo.mobileno}
                      onChange={handleCandidateChange}
                      isInvalid={!!formErrors.mobileno}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.mobileno}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="candidateEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={candidateInfo.email}
                      onChange={handleCandidateChange}
                      isInvalid={!!formErrors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="candidateAadhar">
                    <Form.Label>Aadhar No.</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Aadhar number"
                      name="aadharno"
                      value={candidateInfo.aadharno}
                      onChange={handleCandidateChange}
                      isInvalid={!!formErrors.aadharno}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.aadharno}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <hr />

              {/* Candidate Course Selection */}
              <h4 className="mb-3">Select Course Details</h4>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="deptid">
                    <Form.Label>Department</Form.Label>
                    <Form.Select
                      name="deptid"
                      value={courseSelection.deptid}
                      onChange={handleCourseSelectionChange}
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept.did} value={dept.did}>
                          {dept.dname}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="courseid">
                    <Form.Label>Course</Form.Label>
                    <Form.Select
                      name="courseid"
                      value={courseSelection.courseid}
                      onChange={handleCourseSelectionChange}
                    >
                      <option value="">Select Course</option>
                      {courses.map((course) => (
                        <option key={course.cid} value={course.cid}>
                          {course.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group controlId="view">
                    <Form.Check
                      type="checkbox"
                      label="View"
                      name="view"
                      checked={courseSelection.view}
                      onChange={handleCourseSelectionChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group controlId="download">
                    <Form.Check
                      type="checkbox"
                      label="Download"
                      name="download"
                      checked={courseSelection.download}
                      onChange={handleCourseSelectionChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="secondary" onClick={handleAddCourse}>
                Add Course Selection
              </Button>

              {/* Display DataTable if candidateCourses array is not empty */}
              {candidateCourses.length > 0 && (
                <>
                  <h5 className="mt-4">Course Selections</h5>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Department</th>
                        <th>Course</th>
                        <th>View</th>
                        <th>Download</th>
                      </tr>
                    </thead>
                    <tbody>
                      {candidateCourses.map((entry, index) => {
                        // Get the department and course names from the fetched lists
                        const dept = departments.find(d => d.did === entry.deptid);
                        const course = courses.find(c => c.cid === entry.courseid);
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{dept ? dept.dname : entry.deptid}</td>
                            <td>{course ? course.name : entry.courseid}</td>
                            <td>{entry.view ? "Yes" : "No"}</td>
                            <td>{entry.download ? "Yes" : "No"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </>
              )}

              {/* Submit Button for entire candidate form */}
              <div className="mt-4">
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Submit Candidate
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Submit</DialogTitle>
        <DialogContent>
          Are you sure you want to submit the candidate details along with course selections?
        </DialogContent>
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
        <DialogContent>Candidate created successfully!</DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialogOpen(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </>
  );
};

export default Candidate;
