import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
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
  const [bookroom, setBookroom] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedBookroom, setSelectedBookroom] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookroomRes, hostelsRes, roomsRes] = await Promise.all([
          APIClient.get(apis.getbookroomlist),
          APIClient.get(apis.getHostels),
          APIClient.get(apis.getRooms)
        ]);

        setHostels(hostelsRes.data);
        setRooms(roomsRes.data);

        const bookroomData = bookroomRes.data.map((bookroom) => ({
          id: bookroom.id,
          roomName: roomsRes.data.find((room) => room.id === bookroom.roomid)?.name || "Unknown Room",
          hostelName: hostelsRes.data.find((hostel) => hostel.hid === bookroom.hostalid)?.hname || "Unknown Hostel",
          amount: bookroom.amount
        }));

        setBookroom(bookroomData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, []);

  // Handle Delete
  const handleDeleteClick = (bookroom) => {
    setSelectedBookroom(bookroom);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await APIClient.post(
        `${apis.deleteBookroom}/${selectedBookroom.id}`,
        null,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        setBookroom((prev) => prev.filter((b) => b.id !== selectedBookroom.id));
        toast.success("Booked Room deleted successfully");
      } else {
        toast.error("Failed to delete Booked room");
      }
    } catch (error) {
      console.error("Error deleting Booked room:", error);
      toast.error(error.response?.data || "Failed to delete Booked room");
    } finally {
      setConfirmDialogOpen(false);
    }
  };

  // DataGrid columns
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "roomName", headerName: "Room Name", width: 200 },
    { field: "hostelName", headerName: "Hostel Name", width: 200 },
    { field: "amount", headerName: "Amount", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Button variant="outline-primary" size="sm" as={Link} to={`/BookRoom/EditBookRoom/${params.row.id}`}>
            Edit
          </Button>
          <Button variant="outline-danger" size="sm" style={{ marginLeft: 8 }} onClick={() => handleDeleteClick(params.row)}>
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
        <Link to="/BookRoom/Bookroom" style={{ textDecoration: "none", color: "inherit" }}>
          <Button variant="primary">
            <AddIcon /> Book Room
          </Button>
        </Link>
      </div>

      <Box sx={{ height: 600, width: "100%" }} style={{ backgroundColor: "#fff", padding: "16px" }}>
        <DataGrid
          rows={bookroom}
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
        <DialogContent>Are you sure you want to delete this Booked Room?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <ToastContainer />
      </Snackbar>
    </main>
  );
};

export default Bookroomlist;
