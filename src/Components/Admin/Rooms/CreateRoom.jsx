import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import APIClient from "../../../API/APIClient";
import apis from "../../../API/API.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const CreateRoom = () => {
  // State for room name, hostel selection, and file upload
  const [name, setRoomName] = useState("");
  const [hostalid, setHostelId] = useState("");  // Hostel ID for dropdown
  const [hostels, setHostels] = useState([]);  // Store fetched hostels
  const [formErrors, setFormErrors] = useState({});
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all hostels for dropdown
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await APIClient.get(apis.getHostels);  // Make sure this API is correct
        setHostels(response.data);
      } catch (error) {
        console.error("Error fetching hostels:", error);
      }
    };
    fetchHostels();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = "Please enter a room name";
    if (!hostalid) errors.hostalid = "Please select a hostel";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setConfirmDialogOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setConfirmDialogOpen(false);
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("hostalid", hostalid); // Passing hostel ID for the room

    try {
      const response = await APIClient.post(apis.createRoom, formData); // Ensure this is the correct endpoint

      if (response.status === 200) {
        setTimeout(() => {
          setLoading(false);
          setSuccessDialogOpen(true);
          // Reset form values after success
          setRoomName("");
          setHostelId("");
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
                    <h2 className="fw-bold mb-4 text-center text-uppercase">Create Room</h2>
                    <Form onSubmit={handleSubmit}>

                      {/* Hostel Dropdown */}
                      <Form.Group className="mb-3" controlId="hostalid">
                        <Form.Label>Hostel</Form.Label>
                        <Form.Select
                          value={hostalid}
                          onChange={(e) => setHostelId(e.target.value)}
                          isInvalid={!!formErrors.hostalid}
                        >
                          <option value="">Select Hostel</option>
                          {hostels.map((hostel) => (
                            <option key={hostel.hid} value={hostel.hid}>
                              {hostel.hname}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {formErrors.hostalid}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Room Name */}
                      <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Room Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Room Name"
                          value={name}
                          onChange={(e) => setRoomName(e.target.value)}
                          isInvalid={!!formErrors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.name}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Submit Button */}
                      <div className="d-flex justify-content-between">
                      <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      <Link to="/Rooms/AllRooms">
                          <Button
                            variant="outline-secondary"
                            type="button"
                            className="btn"
                            style={{ width: 100 }}>
                            Back
                          </Button>
                        </Link>
                        
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
        <DialogContent>Are you sure you want to create this room?</DialogContent>
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
        <DialogContent>Room created successfully!</DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialogOpen(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateRoom;
