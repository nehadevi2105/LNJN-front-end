import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [hostels, setHostels] = useState({});
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await APIClient.get(apis.getHostels);
        const hostelsMap = response.data.reduce((acc, hostel) => {
          acc[hostel.hid] = hostel.hname;
          return acc;
        }, {});
        setHostels(hostelsMap);
      } catch (error) {
        console.error("Error fetching hostels:", error);
      }
    };

    const fetchRooms = async () => {
      try {
        const response = await APIClient.get(apis.getRooms);
        setRooms(
          response.data.map((room) => ({
            id: room.id,
            name: room.name,
            hostalName: hostels[room.hostalid] || "Unknown",
          }))
        );
      } catch (error) {
        console.error("Error fetching rooms:", error);
        toast.error("Failed to load rooms");
      }
    };

    fetchHostels().then(fetchRooms);
  }, [hostels]);

  const handleDeleteClick = (room) => {
    setSelectedRoom(room);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await APIClient.post(
        `${apis.deleteRoom}/${selectedRoom.id}`,
        null,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        setRooms((prev) => prev.filter((room) => room.id !== selectedRoom.id));
        toast.success("Room deleted successfully");
      } else {
        toast.error("Failed to delete room");
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      toast.error(error.response?.data || "Failed to delete room");
    } finally {
      setConfirmDialogOpen(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Room Name", width: 250 },
    { field: "hostalName", headerName: "Hostel Name", width: 250 },
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
            to={`/Room/EditRoom/${params.row.id}`}
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
      ),
    },
  ];

  return (
    <main id="main" className="main">
      <div
        className="header-box"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <h2 className="maintitle">Room List</h2>
        <Link
          to="/Rooms/CreateRoom"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button variant="primary">
            <AddIcon /> New Room
          </Button>
        </Link>
      </div>

      <Box
        sx={{ height: 600, width: "100%" }}
        style={{ backgroundColor: "#fff", padding: "16px" }}
      >
        <DataGrid
          rows={rooms}
          columns={columns}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          components={{ Toolbar: GridToolbar }}
          componentsProps={{ toolbar: { showQuickFilter: true } }}
          pageSize={10}
        />
      </Box>

      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this room?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <ToastContainer />
      </Snackbar>
    </main>
  );
};

export default AllRooms;
