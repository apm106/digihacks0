import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Input from "./components/Input";
import "./App.css"; // Import custom styles

function App() {
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/article-review",
        { articleUrl: inputValue },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(response.data.response);
    } catch (error) {
      console.error("Error sending the article review:", error.message);
      if (error.response) {
        console.error(
          "Server responded with status code",
          error.response.status
        );
        console.error("Response data:", error.response.data);
      }
    }
  };

  return (
    <Box className="app-container">
      <Box className="header">
        <h1>Stop the spread of misinformation</h1>
      </Box>
      <Box className="misinformation">stop the spread of misinformation</Box>
      <Box className="input-container">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      </Box>
      <Box className="response-container">
        <p>Response from backend: {message}</p>
      </Box>
    </Box>
  );
}

export default App;
