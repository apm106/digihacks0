import React from "react";
import Box from "@mui/material/Box";
import Input from "./Input"; // Ensure the path to Input is correct
import "../App.css"; // Import styles if needed

function SearchBar({ inputValue, onInputChange, onSubmit }) {
  return (
    <Box className="input-container">
      <Input
        value={inputValue}
        onChange={onInputChange}
        onSubmit={onSubmit}
      />
    </Box>
  );
}

export default SearchBar;