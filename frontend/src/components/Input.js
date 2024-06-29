import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SubmitButton from "./SubmitButton";

export default function Input({ value, onChange, onSubmit }) {
  const handleButtonClick = () => {
    onSubmit(); // Call onSubmit function passed as prop
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSubmit(); // Call onSubmit function passed as prop when Enter key is pressed
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: 600,
        justifyContent: "flex-end", // Aligns items to the end (right side)
      }}
    >
      <TextField
        fullWidth
        placeholder="Paste your link or text" // Use placeholder instead of label
        variant="outlined"
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress} // Add onKeyPress event handler
        InputProps={{
          sx: {
            color: "black",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
              borderRadius: "20px",
              borderWidth: "2px",
            },
            paddingRight: "10px", // Add right padding to ensure text does not overlap button
          },
          endAdornment: (
            <InputAdornment position="end">
              <SubmitButton onClick={handleButtonClick} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
