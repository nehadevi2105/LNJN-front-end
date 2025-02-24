import React, { useEffect, useState } from "react";
import { 
    Dialog, DialogTitle, DialogContent, DialogActions 
} from "@mui/material";
import { Box, Snackbar, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import APIClient from "../../../API/APIClient";
import apis from "../../../API/API.json";
import AddIcon from "@mui/icons-material/Add";
import { Button as Buttons } from "react-bootstrap";

const AllHostel = () => {
  const [hostels, setHostels] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await APIClient.get(apis.getHostels);
        const dataWithIds = response.data.map((hostel, index) => ({
          srno: index + 1,
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
    { field: "srno", headerName: "Sr. No.", width: 300 },
    { field: "hname", headerName: "Hostel Name", width: 350 },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Buttons
            variant="outline-primary"
            size="sm"
            as={Link}
            to={`/Hostel/EditHostel/${params.row.id}`}
          >
            Edit
          </Buttons>
          <Buttons
            variant="outline-danger"
            size="sm"
            style={{ marginLeft: 8 }}
            onClick={() => handleDeleteClick(params.row)}
          >
            Delete
          </Buttons>
        </div>
      )
    }
  ];

  return (
    
    <div className="row justify-content-center">
    <div>
    <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item">Hostel</li>
                <li className="breadcrumb-item active">
                  All Hostel List{" "}
                </li>
              </ol>
            </nav>
      <div className="card">
      <h1 className="maintitle mt-0 pt-0">Hostel List</h1>
        <div className="card-body">
        {/* <Link to="/Hostel/CreateHostel" style={{ textDecoration: "none", color: "inherit" }}>
          <Button variant="primary">
            <AddIcon /> New Hostel
          </Button>
        </Link>
      </div> */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5, mb: 2 , px: "16px"}}>
      <Button variant="contained" color="primary" component={Link} to="/Hostel/CreateHostel">
          <AddIcon /> New Hostel
        </Button>
        <Button variant="contained" color="primary" component={Link} to="">
          Hostel Approval List
        </Button>
        <Button variant="contained" color="secondary" component={Link} to="">
          Hostel Publisher List
        </Button>
      </Box>

      <Box sx={{ height: 600, width: "100%" }} style={{ backgroundColor: "#fff", padding: "16px" }}>
        <DataGrid
          rows={hostels}
          columns={columns}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          slots={{
                toolbar: GridToolbar, // Correct way to use the toolbar
              }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
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
    </div>
    </div>
  </div>
  </div>
  );
};

export default AllHostel;
