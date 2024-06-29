import React from "react";
import Box from "@mui/material/Box";
import FalseStatements from "../components/FalseStatements";
import SearchBar from "../components/SearchBar";
import "../App.css"; 
import logo from "../icons/Logo.png"

function LandingPage({ inputValue, onInputChange, onSubmit }) {
  return (
    <Box className="app-container">
      <FalseStatements />
      <Box className="misinformation">STOP THE SPREAD OF MISINFORMATION</Box>
      <SearchBar
        inputValue={inputValue}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
      />
      <Box
        component="img"
        src={logo}
        alt="Logo"
        sx={{
          width: '100px',
          height: 'auto',
          margin: '0 auto',
          display: 'block',
        }}
        pt={4}
      />
      <Box className="misinformation">Trust-o-meter</Box>
    </Box>
  );
}

export default LandingPage;
