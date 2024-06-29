import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import FalseStatements from "../components/FalseStatements";
import SearchBar from "../components/SearchBar";
import "../App.css"; // Import custom styles

function LandingPage() {
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
      console.log(response.data);
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
      <FalseStatements />
      <Box className="misinformation">STOP THE SPREAD OF MISINFORMATION</Box>
      <SearchBar
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}

export default LandingPage;
