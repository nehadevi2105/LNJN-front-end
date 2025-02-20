import React, { useEffect, useState } from "react";
import { 
  Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, 
  Snackbar, TextField 
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import APIClient from "../../../API/APIClient";
import apis from "../../../API/API.json";
import AddIcon from "@mui/icons-material/Add";

const AllDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Fetch department data
  useEffect(() => {
    let isMounted = true; // Prevents setting state if the component unmounts
  
    async function fetchDepartments() {
      try {
        const response = await APIClient.get(apis.getDepartments);
        if (!isMounted) return; // Avoid setting state if unmounted
  
        const newData = response.data.map((row, index) => ({
          id: index, did: row.did, dname: row.dname
        }));
  
        setDepartments((prev) => 
          JSON.stringify(prev) === JSON.stringify(newData) ? prev : newData
        );
  
      } catch (error) {
        console.error("Error fetching departments:", error);
        toast.error("Failed to load departments");
      }
    }
  
    fetchDepartments();
  
    return () => {
      isMounted = false; // Cleanup function to prevent setting state on unmounted component
    };
  }, []);
  

  // Handle delete click
  const handleDeleteClick = (department) => {
    setSelectedDepartment(department);
    setConfirmDialogOpen(true);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    try {
      const response = await APIClient.post(`${apis.deleteDepartment}/${selectedDepartment.did}`, {
        headers: { "Content-Type": "application/json" } // Explicitly set content type
      });
  
      if (response.status === 200) {
        setDepartments((prev) => prev.filter((dept) => dept.did !== selectedDepartment.did));
        toast.success("Department deleted successfully");
      } else {
        toast.error("Failed to delete department");
      }
    } catch (error) {
      console.error("Error deleting department:", error);
      toast.error(error.response?.data || "Failed to delete department");
    } finally {
      setConfirmDialogOpen(false);
    }
  };

  // Handle edit click
  const handleEditClick = (department) => {
    setSelectedDepartment(department);
    setUpdatedName(department.dname);
    //handleConfirmEdit();
    setEditDialogOpen(true);
  };

  // Confirm edit
  const handleConfirmEdit = async () => {
    try {
      const updatedDepartment = { ...selectedDepartment, dname: updatedName };
      const response = await APIClient.post(`${apis.editDepartment}/${selectedDepartment.did}`, updatedDepartment);

      if (response.status === 200) {
        setDepartments((prev) =>
          prev.map((dept) => (dept.did === selectedDepartment.did ? updatedDepartment : dept))
        );
        toast.success("Department updated successfully");
      } else {
        toast.error("Failed to update department");
      }
    } catch (error) {
      console.error("Error updating department:", error);
      toast.error("Failed to update department");
    } finally {
      setEditDialogOpen(false);
    }
  };

  const columns = [
    { field: "did", headerName: "S.No", width: 50 },
    { field: "dname", headerName: "Department Name", width: 200 },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      renderCell: (params) => (
        <Button color="primary"><Link to={"/Department/EditDepartment/"+params.row.did} >Edit</Link></Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => (
        <Button color="error" onClick={() => handleDeleteClick(params.row)}>Delete</Button>
      ),
    },
  ];

  return (
    <div className="row justify-content-center">
    <div>
      <div className="card">
        <div className="card-body">
        <h2 className="maintitle">Department List</h2>
      
     

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
      <Button variant="contained" color="primary" component={Link} to="/Department/DepartmentForm">
                <AddIcon /> New Department
                </Button>
                <Button variant="contained" color="primary" component={Link} to="/Approvalfooterlist">
                   Department Approval List
                </Button>
                <Button variant="contained" color="secondary" component={Link} to="/Publisherfooterlist">
                  Department  Publisher List
                </Button>
            </Box>

      <Box sx={{ height: 400, width: "100%" }} style={{ backgroundColor: "#fff" }}>
        <DataGrid
          rows={departments}
          columns={columns}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          components={{ Toolbar: GridToolbar }}
          componentsProps={{ toolbar: { showQuickFilter: true } }}
        />
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this department?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Department</DialogTitle>
        <DialogContent>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleConfirmEdit} color="primary">Save</Button>
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

export default AllDepartments;
