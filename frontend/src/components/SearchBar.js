import React from "react";
import Box from "@mui/material/Box";
import Input from "./Input";
import "../App.css";

function SearchBar({ inputValue, onInputChange, onSubmit }) {
  return (
    <Box className="input-container">
      <Input 
        value={inputValue} 
        onChange={onInputChange} 
        onSubmit={onSubmit} 
        backgroundColor="#f9f6e0" // Light yellowish color
      />
    </Box>
  );
}

export default SearchBar;
