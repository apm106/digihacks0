import React from "react";
import { Box } from "@mui/material";
import SearchBar from "../components/SearchBar";
import logo from "../icons/Logo.png";
import "../App.css"; 

function ResultsPage({ inputValue, onInputChange, onSubmit }) {
  return (
    <Box className="header-banner">
      <Box className="header-container">
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            width: '60px',
            height: 'auto',
            marginRight: '30px', 
            marginLeft: '10px'
          }}
        />
        <Box className="header-content" pt="15px">
          <Box className="misinformation" mr="230px">Trust-o-meter</Box>
          <SearchBar
            inputValue={inputValue}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            sx={{ width: '100%', maxWidth: '400px' }} // Adjust width as needed
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ResultsPage;
