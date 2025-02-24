import React, { useEffect, useState } from "react";
import { 
  Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, 
  Snackbar, TextField 
} from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import APIClient from "../../../API/APIClient";
import apis from "../../../API/API.json";
import AddIcon from "@mui/icons-material/Add";

//  Move CustomToolbar function ABOVE UserTable
const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarQuickFilter sx={{ marginRight: "auto" }} /> {/*  Search bar */}
    <GridToolbarExport /> {/*  Export button */}
  </GridToolbarContainer>
);

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDetails, setUpdatedDetails] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Fetch courses on mount
  useEffect(() => {
    async function fetchCourses() {
      try {
        debugger;
        console.log(apis.getCourses);
        const response = await APIClient.get(apis.getCourses);
        // Map API response to include an "id" field for DataGrid
        const dataWithIds = response.data.map((row, index) => ({
          //id: index,         // For DataGrid internal use
          id: row.id,      // Course ID from the backend
          name: row.name,
          coursedetails: row.coursedetails,
          dname: row.dname // Assuming a joined department name
        }));
        setCourses(dataWithIds);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to load courses");
      }
    }
    fetchCourses();
  }, []);

  // Handle Delete
  const handleDeleteClick = (course) => {
    setSelectedCourse(course);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await APIClient.post(`${apis.deleteCourse}/${selectedCourse.id}`, null, {
        headers: { "Content-Type": "application/json" }
      });
  
      if (response.status === 200) {
        setCourses((prev) =>
          prev.filter((course) => course.id !== selectedCourse.id)
        );
        toast.success("Course deleted successfully");
      } else {
        toast.error("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error(error.response?.data || "Failed to delete course");
    } finally {
      setConfirmDialogOpen(false);
    }
  };

  // Handle Edit
  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setUpdatedName(course.name);
    setUpdatedDetails(course.coursedetails);
    setEditDialogOpen(true);
  };

  const handleConfirmEdit = async () => {
    try {
      const updatedCourse = { 
        ...selectedCourse, 
        name: updatedName, 
        coursedetails: updatedDetails 
      };
      const response = await APIClient.post(`${apis.editCourse}/${selectedCourse.id}`, updatedCourse);
      if (response.status === 200) {
        setCourses((prev) =>
          prev.map((course) =>
            course.id === selectedCourse.id ? updatedCourse : course
          )
        );
        toast.success("Course updated successfully");
      } else {
        toast.error("Failed to update course");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course");
    } finally {
      setEditDialogOpen(false);
    }
  };

  // Define columns for DataGrid, including Edit and Delete operation columns
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Course Name", width: 200 },
    { field: "coursedetails", headerName: "Course Description", width: 300 },
    // { field: "deptid", headerName: "Department", width: 200 },
    { field: "dname", headerName: "Department Name", width: 200 },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Button color="primary">
          <Link to={`/Course/EditCourse/${params.row.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            Edit
          </Link>
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Button color="error" onClick={() => handleDeleteClick(params.row)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="row justify-content-center">
    <div className="formdata">
    <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item">Course</li>
              <li className="breadcrumb-item active">Course List</li>
            </ol>
          </nav>
          <h2 className="maintitle">Course List</h2>

          <div className="d-flex justify-content-left" style={{ marginLeft: "10px" }}>
       
        <Link to="/Course/CreateCourse" className="btn btn-info">
          <p>
            <AddIcon /> New Course
          </p>
        </Link>
     </div>
     <div className="card-body">
      <Box sx={{ height: 500, width: "100%" }} style={{ backgroundColor: "#fff" }}>
        <DataGrid
          rows={courses}
          columns={columns}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          slots={{ toolbar: CustomToolbar }}
          componentsProps={{ toolbar: { showQuickFilter: true } }}
        />
      </Box>
</div>
      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this course?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Course</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Course Name"
            fullWidth
            variant="standard"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Course Description"
            fullWidth
            variant="standard"
            value={updatedDetails}
            onChange={(e) => setUpdatedDetails(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <ToastContainer />
      </Snackbar>

  </div>
  </div>
  );
};

export default AllCourses;
