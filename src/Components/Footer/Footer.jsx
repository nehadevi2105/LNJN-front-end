import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: "rgb(51 153 255)", // Matches header color
        color: "white",
        textAlign: "center",
        height:"40px",
        padding: { xs: "8px", sm: "12px", md: "16px" }, // Adjust padding for different screen sizes
        fontSize: { xs: "12px", sm: "14px", md: "16px" }, // Adjust font size
        position: "relative", // Keeps footer at bottom without absolute positioning
        margin: "20px 0",
      }}

    >
      <Typography variant="body2">
        National Forensic Sciences University Delhi Campus (LNJN NICFS)
      </Typography>
      {/* <Typography variant="body2">
        Lok Nayak Jayaprakash Narayan National Institute of Criminology
      </Typography> */}
    </Box>
  );
};

export default Footer;
