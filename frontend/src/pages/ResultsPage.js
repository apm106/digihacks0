import React from "react";
import { Box } from "@mui/material";
import SearchBar from "../components/SearchBar";
import "../App.css"; // Import custom styles

function ResultsPage({ inputValue, onInputChange, onSubmit }) {
  return (
    <Box className="app-container">
      <SearchBar
        inputValue={inputValue}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
      />
    </Box>
  );
}

export default ResultsPage;