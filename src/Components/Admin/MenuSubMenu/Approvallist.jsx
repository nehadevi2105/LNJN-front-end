import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
//import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
//import Header from '../../header/Header';
//import Sidebar from '../../sidebar/Sidebar';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import APIClient from "../../../API/APIClient";
import apis from "../../../API/API.json";
//import Footer from '../../footer/Footer';
import AddIcon from "@mui/icons-material/Add";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import './WhatsNewTable.scss'

function Approvallist() {
  const [apiData, setApiData] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const storedUserString = localStorage.getItem("user");
  const user = JSON.parse(storedUserString);

  const columns = [
    { field: "id", headerName: "S.No", width: 100 },
    { field: "menuname", headerName: "Title", width: 250 },
    { field: "internal_link", headerName: "Internal Link", width: 120 },
    { field: "external_link", headerName: "External Link", width: 120 },
    { field: "menuurl", headerName: "Menu Url", width: 250 },
    {
      field: "edit",
      headerName: "View Data",
      sortable: false,
      renderCell: (params) =>
        1 === 1 || null ? ( // Check the user role here
          <Link to={"/approvaleditdata/" + params.row.id}>
            <EditIcon style={{ cursor: "pointer" }} />
          </Link>
        ) : (
          // <DesignServicesIcon
          //     style={{ cursor: 'no-drop', color: 'red' }}
          //     disabled
          // />
          <Link to={"/approvaleditdata/" + params.row.id}>
            <EditIcon style={{ cursor: "pointer" }} />
          </Link>
        ),
    }
   
  ];

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setConfirmDialogOpen(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      await APIClient.post("/TopMenu/delete/" + selectedItem.id);
      setApiData((prevData) =>
        prevData.filter((item) => item.id !== selectedItem.id)
      );
      setIsDeleting(false);
      setModalMessage("Data deleted successfully");
      setSnackbarOpen(true);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized access. Please log in.");
      } else {
        toast.error("Something Went Wrong!");
        console.error("Error saving/updating data:", error);
      }
    } finally {
      setConfirmDialogOpen(false);
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmDialogOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await APIClient.get(apis.approvallist);
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
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <div className="pagetitle-lft">
            <h1 className="maintitle">All Approval List</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item">Service</li>
                <li className="breadcrumb-item active">All Approval List</li>
              </ol>
            </nav>
          </div>
          <div className="pagetitle-rgt">
            <Link to="/dashboard">
              <button type="button" className="btn btn-info">
                Back
              </button>
            </Link>
          </div>
        </div>
        <div className="header-box">
         
        </div>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={apiData}
            columns={columns}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            components={{
              Toolbar: GridToolbar,
            }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
          />
        </Box>
      </main>

      <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmation}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this data?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert severity="success" onClose={() => setSnackbarOpen(false)}>
          {modalMessage}
        </MuiAlert>
      </Snackbar>
      <ToastContainer />
    </div>
  );
}

export default Approvallist;
