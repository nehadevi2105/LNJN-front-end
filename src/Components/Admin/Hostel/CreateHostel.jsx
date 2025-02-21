import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import APIClient from "../../../API/APIClient";
import apis from "../../../API/API.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const CreateHostel = () => {
  const [hname, setHostelName] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Validate the form input   
  const validateForm = () => {
    const errors = {};
    if (!hname.trim()) {
      errors.hname = "Please enter a hostel name";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ✅ Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setConfirmDialogOpen(true);
  };

  // ✅ Handle API Submission
  const handleConfirmSubmit = async () => {
    setConfirmDialogOpen(false);
    setLoading(true);

    try {
      const payload = { hname }; // Corrected payload
      console.log("Payload being sent:", payload);

      const response = await APIClient.post(apis.createHostel, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status >= 200 && response.status < 300) {
        setTimeout(() => {
          setLoading(false);
          setSuccessDialogOpen(true);
          setHostelName(""); // ✅ Reset hname properly
        }, 1000);
      } else if (response.status && response.status === 500) {
        toast.error("Hostel already exists");
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
    <div className="row justify-content-center">
    <div className="formdata">
      <div className="card">
        <div className="card-body">
                      <h2 className="fw-bold mb-4 text-center text-uppercase">Create Hostel</h2>
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="HostelName">
                          <Form.Label style={{ color: "black" }}>Hostel Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Hostel Name"
                            value={hname}
                            onChange={(e) => setHostelName(e.target.value)}
                            isInvalid={!!formErrors.hname}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors.hname}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <div className="d-flex" style={{ justifyContent: "space-between" }}>
                          <Button variant="primary" type="submit" style={{ width: 100 }} disabled={loading}>
                            {loading ? "Submitting..." : "Submit"}
                          </Button>
                        <Link to="/Hostel/AllHostel">
                          <Button
                            variant="outline-secondary"
                            type="button"
                            className="btn"
                            style={{ width: 100 }}>
                            Back
                          </Button>
                        </Link>
                        </div>
                      </Form>
      <ToastContainer />

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Create</DialogTitle>
        <DialogContent>Are you sure you want to create this hostel?</DialogContent>
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
        <DialogContent>Hostel created successfully!</DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialogOpen(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
    </div>
    </div>
  );
};

export default CreateHostel;
