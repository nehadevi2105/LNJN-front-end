import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Form, Spinner } from 'react-bootstrap';
import APIClient from "../../../API/APIClient";
import apis from "../../../API/API.json";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { Row } from 'react-bootstrap/esm';

export const EditDepartment = () => {
  const { id } = useParams();
  const [formErrors, setFormErrors] = useState({});
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    dname: ''  // Ensure it matches the API response field
  });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await APIClient.get(`${apis.getDepartments}/${id}`);
        setFormData({ dname: response.data.dname }); // Ensure it matches API response
      } catch (error) {
        console.error('Error fetching department:', error);
      }
    };
    fetchDepartment();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.dname.trim()) {
      errors.dname = 'Department name is required';
    }
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
    try {
      const response = await APIClient.post(`${apis.editDepartment}/${id}`, formData);
      if (response.status === 200) {
        setTimeout(() => {
          setLoading(false);
          setSuccessDialogOpen(true);
          setFormData({ dname: '' });
        }, 1000);
      } else {
        toast.error('Failed to update department');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error updating department:', error);
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
                        <h2 className="fw-bold mb-4 text-center text-uppercase">Edit Department</h2>
                        <Link to="/Department/AllDepartment">
                          <button type="button" className="btn btn-info">Back</button>
                        </Link>
                        <Form onSubmit={handleSubmit}>
                          <Form.Group className="mb-3" controlId="dname">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Department Name"
                              name="dname"  // Ensure name matches formData property
                              value={formData.dname}
                              onChange={handleChange}
                              isInvalid={!!formErrors.dname}
                            />
                            <Form.Control.Feedback type="invalid">
                              {formErrors.dname}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <div className="d-flex justify-content-between">
                            <Button variant="primary" type="submit">Submit</Button>
                          </div>
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
              </Container>
            </div>
          </div>
        </main>
      </div>
      
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>Are you sure you want to update this department?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleUpdateConfirm} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>Department updated successfully!</DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialogOpen(false)} color="primary">OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
