import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SubmitButton from "./SubmitButton";

export default function Input({ value, onChange, onSubmit }) {
  const handleButtonClick = () => {
    onSubmit(); // Call onSubmit function passed as prop
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
        label="Paste your link or text"
        variant="outlined"
        value={value}
        onChange={onChange}
        InputLabelProps={{
          sx: { color: "#ffffff" },
        }}
        InputProps={{
          sx: {
            color: "#ffffff",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ffffff",
            },
            paddingRight: 0, // Remove default padding to align button correctly
          },
          endAdornment: <SubmitButton onClick={handleButtonClick} />,
        }}
      />
    </Box>
  );
}
