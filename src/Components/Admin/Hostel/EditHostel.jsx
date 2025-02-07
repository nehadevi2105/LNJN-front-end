import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import APIClient from "../../../API/APIClient";
import apis from "../../../API/API.json";
import "react-toastify/dist/ReactToastify.css";

const EditHostel = () => {
  const { hid, hname } = useParams(); // Hostel ID and Name from route parameters

  const [hostelName, setHostelName] = useState(hname || "");
  const [loading, setLoading] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    // Fetch hostel details by ID
    const fetchHostelDetails = async () => {
      try {
        const response = await APIClient.get(`${apis.getHostels}/${id}`);
        if (response.status === 200) {
          setHostelName(response.data.hname); // Assuming the hostel name is in response.data.name
        } else {
          toast.error("Failed to fetch hostel details");
        }
      } catch (error) {
        toast.error("Something went wrong while fetching hostel details");
      }
    };
    fetchHostelDetails();
  }, [hid]);

  const handleInputChange = (e) => {
    setHostelName(e.target.value);
  };

  const validateForm = () => {
    if (!hostelName.trim()) {
      setFormError("Hostel name is required");
      return false;
    }
    setFormError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in the hostel name.");
      return;
    }
    setConfirmDialogOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setConfirmDialogOpen(false);
    setLoading(true);

    try {
      const response = await APIClient.post(`${apis.editHostel}${hid}`, { name: hostelName }, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        toast.success("Hostel name updated successfully!");
      } else {
        toast.error("Failed to update hostel name");
      }
    } catch (error) {
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
            <h2 className="text-center text-uppercase mb-4">Edit Hostel</h2>
            <Form onSubmit={handleSubmit}>
            {/* <Row className="mb-3"> */}
              <Col md={6} className="mx-auto">
                <Form.Group controlId="hostelName">
                  <Form.Label>Hostel Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter hostel name"
                    width={100}
                    value={hostelName}
                    onChange={handleInputChange}
                    isInvalid={!!formError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formError}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            {/* </Row> */}
              <div className="text-center mt-3 d-flex" style={{ justifyContent: "space-between" }}>
              <Link to="/Hostel/AllHostel">
                    <Button
                        variant="outline-secondary"
                        type="button"
                        className="btn"
                        style={{ width: 100 }}>
                        Back
                    </Button>
                </Link>
                <Button variant="primary" type="submit">
                  {loading ? <Spinner animation="border" size="sm" /> : "Update Hostel"}
                </Button>
                
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>Are you sure you want to update the hostel ?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </>
  );
};

export default EditHostel;
