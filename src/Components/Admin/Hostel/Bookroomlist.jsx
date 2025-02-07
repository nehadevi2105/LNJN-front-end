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

const Bookroomlist = () => {
  const [candidates, setCandidates] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await APIClient.get(apis.getbookroomlist);
        // Map the API response to add an "id" field for DataGrid
        const dataWithIds = response.data.map((bookroom) => ({
          id: bookroom.id, // Unique candidate ID
          roomid: bookroom.roomid,
          hostalid: bookroom.hostalid,
          amount: bookroom.amount
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
    { field: "roomid", headerName: "Room No", width: 200 },
    { field: "hostalid", headerName: "Hostal", width: 150 },
    { field: "amount", headerName: "Amount", width: 200 },
  
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
    <main id="main" className="main">
      <div className="header-box" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px" }}>
        <h2 className="maintitle">Book Room List</h2>
        <Link to="/Hostel/Bookroom" style={{ textDecoration: "none", color: "inherit" }}>
          <Button variant="primary">
            <AddIcon /> Book Room
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
    </main>
  );
};

export default Bookroomlist;
