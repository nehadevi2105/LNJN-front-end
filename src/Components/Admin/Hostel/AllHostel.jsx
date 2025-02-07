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

const AllHostel = () => {
  const [hostels, setHostels] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await APIClient.get(apis.getHostels);
        const dataWithIds = response.data.map((hostel) => ({
          id: hostel.hid, // Unique hostel ID
          hname: hostel.hname,
        }));
        setHostels(dataWithIds);
      } catch (error) {
        console.error("Error fetching hostels:", error);
        toast.error("Failed to load hostels");
      }
    };
    fetchHostels();
  }, []);

  // Handle Delete
  const handleDeleteClick = (hostel) => {
    setSelectedHostel(hostel);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await APIClient.post(
        `${apis.deleteHostel}/${selectedHostel.id}`,
        null,
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.status === 200) {
        setHostels((prev) =>
          prev.filter((hostel) => hostel.id !== selectedHostel.id)
        );
        toast.success("Hostel deleted successfully");
      } else {
        toast.error("Failed to delete hostel");
      }
    } catch (error) {
      console.error("Error deleting hostel:", error);
      toast.error(error.response?.data || "Failed to delete hostel");
    } finally {
      setConfirmDialogOpen(false);
    }
  };

  // Define columns for the DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "hname", headerName: "Hostel Name", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Button
            variant="outline-primary"
            size="sm"
            as={Link}
            to={`/Hostel/EditHostel/${params.row.id}`}
          >
            Edit
          </Button>
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
        <h2 className="maintitle">Hostel List</h2>
        <Link to="/Hostel/CreateHostel" style={{ textDecoration: "none", color: "inherit" }}>
          <Button variant="primary">
            <AddIcon /> New Hostel
          </Button>
        </Link>
      </div>

      <Box sx={{ height: 600, width: "100%" }} style={{ backgroundColor: "#fff", padding: "16px" }}>
        <DataGrid
          rows={hostels}
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
        <DialogContent>Are you sure you want to delete this hostel?</DialogContent>
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

export default AllHostel;
