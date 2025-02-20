import React, { useEffect, useState } from "react";
import { 
    Dialog, DialogTitle, DialogContent, DialogActions 
  } from "@mui/material";
import { Box, Snackbar } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import APIClient from "../../../API/APIClient";
import apis from "../../../API/API.json";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "react-bootstrap";

const AllCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await APIClient.get(apis.getCandidates);
        // Map the API response to add an "id" field for DataGrid
        const dataWithIds = response.data.map((candidate) => ({
          id: candidate.id, // Unique candidate ID
          name: candidate.name,
          mobileno: candidate.mobileno,
          email: candidate.email,
          aadharno: candidate.aadharno,
          // courses: candidate.lstcand // Optionally, include course selections if needed
        }));
        setCandidates(dataWithIds);
      } catch (error) {
        console.error("Error fetching candidates:", error);
        toast.error("Failed to load candidates");
      }
    };

    fetchCandidates();
  }, []);

  // Handle Delete
  const handleDeleteClick = (candidate) => {
    setSelectedCandidate(candidate);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await APIClient.post(
        `${apis.deleteCandidate}/${selectedCandidate.id}`,
        null,
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.status === 200) {
        setCandidates((prev) =>
          prev.filter((candidate) => candidate.id !== selectedCandidate.id)
        );
        toast.success("Candidate deleted successfully");
      } else {
        toast.error("Failed to delete candidate");
      }
    } catch (error) {
      console.error("Error deleting candidate:", error);
      toast.error(error.response?.data || "Failed to delete candidate");
    } finally {
      setConfirmDialogOpen(false);
    }
  };

 
  // Define columns for the DataGrid. The action column provides Edit and Delete options.
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Candidate Name", width: 200 },
    { field: "mobileno", headerName: "Mobile No", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "aadharno", headerName: "Aadhar No", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <div>
          {/* Edit candidate link */}
          <Button variant="outline-primary" size="sm" as={Link} to={`/Candidate/EditCandidate/${params.row.id}`}>
            Edit
          </Button>
          {/* Delete candidate button */}
          <Button
            variant="outline-danger"
            size="sm"
            style={{ marginLeft: 8 }}
            onClick={() => handleDeleteClick(params.row)}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="row justify-content-center">
    <div>
      <div className="card">
        <div className="card-body">
        <h2 className="maintitle">Candidate List</h2>
        <Link to="/Candidate/CreateCandidate" style={{ textDecoration: "none", color: "inherit" }}>
          <Button variant="primary">
            <AddIcon /> New Candidate
          </Button>
        </Link>
      </div>

      <Box sx={{ height: 600, width: "100%" }} style={{ backgroundColor: "#fff", padding: "16px" }}>
        <DataGrid
          rows={candidates}
          columns={columns}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          components={{ Toolbar: GridToolbar }}
          componentsProps={{ toolbar: { showQuickFilter: true } }}
          pageSize={10}
        />
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this candidate?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <ToastContainer />
      </Snackbar>
    </div>
  </div>
  </div>
  );
};

export default AllCandidates;
