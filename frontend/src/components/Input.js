import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SubmitButton from "./SubmitButton";

export default function Input({ value, onChange, onSubmit, backgroundColor }) {
  const handleButtonClick = () => {
    onSubmit();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: 600,
        justifyContent: "flex-end",
      }}
    >
      <TextField
        fullWidth
        placeholder="Paste your link or text"
        variant="outlined"
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        InputProps={{
          sx: {
            color: "black",
            backgroundColor: backgroundColor || "#fff",
            borderRadius: "20px", // Ensure the border radius is applied to the background
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              "& fieldset": {
                borderColor: "black",
                borderWidth: "2px",
              },
            },
            paddingRight: "10px",
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
