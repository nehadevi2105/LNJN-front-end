import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { Button, Container, Typography } from "@mui/material"; 

const Department = () => {
    const [departmentName, setDepartmentName] = useState(""); // State to hold input value
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent page reload on form submit
      alert(`Department Name: ${departmentName}`); // Show alert with department name
      setDepartmentName(""); // Clear the input field
    };
  
    return (
    <>
      <Container maxWidth="xs">  {/* Center the form within a container */}
        <Box
          sx={{
            display: "flex",
            maxWidth: "full",
            flexDirection: "column",
            justifyContent: "center",
            padding: "20px",
            backgroundColor: "#f5f5f5", // Light grey background
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" align="center" sx={{ marginBottom: "15px", fontWeight: "bold" }}>
            Add New Department
          </Typography>
  
          {/* Department Name Input Field */}
          <TextField
            label="Department Name"
            variant="outlined"
            fullWidth
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)} // Handle input change
            sx={{ marginBottom: "20px" }} // Spacing between input fields
            required
          />
  
          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{
              padding: "10px",
              backgroundColor: "#3f51b5", // Primary color for button
              '&:hover': {
                backgroundColor: "#303f9f", // Hover effect color
              }
            }}
          >
            Submit
          </Button>
        </Box>
      </Container>
    </>
    );
  };
export default Department