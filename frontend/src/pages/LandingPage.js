import React from "react";
import Box from "@mui/material/Box";
import FalseStatements from "../components/FalseStatements";
import SearchBar from "../components/SearchBar";
import "../App.css"; // Import custom styles

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
    </Box>
  );
}

export default LandingPage;
