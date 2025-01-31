import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Container, Typography, Paper } from "@mui/material";

const Department = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState(""); // State to store API URL

  // Fetch API URLs from API.json
  useEffect(() => {
    fetch("/API.json") // Load the JSON file
      .then((response) => response.json())
      .then((data) => {
        setApiUrl(data.departmentPost); // Get the POST API URL from JSON
      })
      .catch((error) => console.error("Error loading API URLs:", error));
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!departmentName.trim()) {
      alert("Please enter a department name.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ departmentName }),
      });

      if (response.ok) {
        alert("Department added successfully!");
        setDepartmentName(""); // Clear input field
      } else {
        alert("Failed to add department.");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Error submitting data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: "30px",
          borderRadius: "12px",
          textAlign: "center",
          backgroundColor: "#fff",
          boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Add New Department
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Department Name"
            variant="outlined"
            fullWidth
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            sx={{ mb: 3 }}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              padding: "12px",
              fontSize: "16px",
              backgroundColor: "#3f51b5",
              "&:hover": { backgroundColor: "#303f9f" },
            }}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Department;
