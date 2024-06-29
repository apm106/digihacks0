import * as React from "react";
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
      }}
    >
      <TextField
        sx={{ flex: "700%", mr: 1 }}
        fullWidth
        label="Paste your link or text"
        variant="outlined"
        value={value}
        onChange={onChange}
        InputLabelProps={{
          sx: { color: "#ffffff" }, // Sets the label color to white
        }}
        InputProps={{
          sx: {
            color: "#ffffff", // Sets the input text color to white
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ffffff", // Sets the outline color to white
            },
          },
        }}
      />
      <SubmitButton onClick={handleButtonClick} sx={{ flex: "10%", ml: 1 }} />
    </Box>
  );
}
