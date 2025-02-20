import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import APIClient from "../../../API/APIClient";
import apis from "../../../API/API.json";

const UserTable = () => {
  const [apiData, setApiData] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const storedUserString = localStorage.getItem("user");
  const user = storedUserString ? JSON.parse(storedUserString) : null;

  const columns = [
    { field: "user_id", headerName: "S.No", width: 50 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "mobile_no", headerName: "Mobile No", width: 200 },
    { field: "address", headerName: "Address", width: 200 },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      renderCell: (params) => (
        <Link to={"/User/EditUser/" + params.row.user_id}>
          <EditIcon style={{ cursor: "pointer" }} />
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => (
        <DeleteIcon
          style={{ cursor: "pointer" }}
          onClick={() => handleDeleteClick(params.row)}
        />
      ),
    },
  ];

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setConfirmDialogOpen(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      // await apiClient.delete(api.getwhatsnewbyid  + selectedItem.u_id);   Tenderbyid
      await APIClient.post("/api/user/delete/" + selectedItem.user_id);
      setApiData((prevData) =>
        prevData.filter((item) => item.id !== selectedItem.user_id)
      );
      setIsDeleting(false);
      setModalMessage("Data deleted successfully");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting data:", error);
    } finally {
      setConfirmDialogOpen(false);
    } 
  };

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching data from:", apis.newuser);

        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure the token exists
          "Content-Type": "application/json",
        };

        const response = await APIClient.get(apis.newuser, { headers });

        console.log("API Response:", response);

        if (!response || !response.data) {
          throw new Error("No data received from API.");
        }

        const dataWithIds = response.data.map((row, index) => ({
          id: index + 1,
          ...row,
        }));

        setApiData(dataWithIds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="row justify-content-center">
    <div>
      
        <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item">User</li>
              <li className="breadcrumb-item active">All Users</li>
            </ol>
          </nav>
          <h1>All Users</h1>
         
          <Link to="/dashboard">
            <button type="button" className="btn btn-info">
              Back
            </button>
          </Link>
          <div className="card">
          <div className="card-body">
        <Box sx={{ height: 400, width: "100%", backgroundColor: "#fff" }}>
          <DataGrid
            rows={apiData}
            columns={columns}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            components={{ Toolbar: GridToolbar }}
            componentsProps={{ toolbar: { showQuickFilter: true } }}
          />
        </Box>
     </div>
      </div>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert severity="success" onClose={() => setSnackbarOpen(false)}>
          {modalMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  </div>
  );
};

export default UserTable;
