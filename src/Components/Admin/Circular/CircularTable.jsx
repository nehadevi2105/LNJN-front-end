import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
//import axios from 'axios';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
// import {
//   getLinks,
//   getTender,
//   getReport,
//   getwhatsnew,
//   getMenuoptins, BASE_URL
// } from "../../../../Api/ApiFunctions.jsx";

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

import AddIcon from "@mui/icons-material/Add";
//import "./TenderTable.scss";

const CircularTable = () => {
  const [apiData, setApiData] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const columns = [
    { field: "id", headerName: "S.No", width: 50 },
    { field: "tittle", headerName: "Title", width: 200 },
    { field: "startdate", headerName: "Start Date", width: 120 },
    { field: "end_date", headerName: "End date", width: 120 },
    { field: "file ", headerName: "File", width: 200 },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      renderCell: (params) => (
        <Link to={"/Circular/EditCircular/" + params.row.id}>
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
      await APIClient.post("/api/Circular/delete/" + selectedItem.id);
      setApiData((prevData) =>
        prevData.filter((item) => item.id !== selectedItem.id)
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

  const handleCloseConfirmation = () => {
    setConfirmDialogOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await APIClient.get(apis.getCircular);
        //const response = await getTender();
        const dataWithIds = response.data.map((row, index) => ({
          id: index,
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
            <h1 className="maintitle">Circular Table</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item">Circular</li>
                <li className="breadcrumb-item active">Circular Table </li>
              </ol>
            </nav>
          </div>
          <div className="pagetitle-rgt">
            {/* <Link to="/dashboard">
              <button type="button" className="btn btn-info my-1">
                Back
              </button>
            </Link> */}
          </div>
        </div>
        <div className="header-box">
          <div className="header-box-lft"></div>
          <div className="header-box-rgt">
            <Link to="/Circular/CircularForm">
              <p>
                <AddIcon />
                New Circular
              </p>
            </Link>
          </div>
          <div className="header-box-rgt">
            <Link to="/approvecirculardata">
              <p>
               
                Get Approval List
              </p>
            </Link>
          </div> 
           <div className="header-box-rgt">
            <Link to="/publishcirculardata">
              <p>
               
                Get Publisher List
              </p>
            </Link>
          </div>
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
    </div>
  );
};
export default CircularTable;
