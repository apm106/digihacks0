import React, { useState } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import ResultsPage from "./pages/ResultsPage";
import axios from "axios";
import { useTheme } from "@emotion/react";

function App() {
  const [showResults, setShowResults] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [articleData, setArticleData] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleSubmit = () => {
    if (inputValue) {
      handleShowResults(); // Immediately switch to the results page      
    }

    // Send the server request in the background
    axios
      .post(
        "http://localhost:3001/article-review",
        { articleUrl: inputValue },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setArticleData(response.data);
      })
      .catch((error) => {
        console.error("Error sending the article review:", error.message);
        if (error.response) {
          console.error(
            "Server responded with status code",
            error.response.status
          );
          console.error("Response data:", error.response.data);
        }
      });
  };

  return showResults ? (
    <ResultsPage
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      articleData={articleData}
    />
  ) : (
    <LandingPage
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
    />
  );
}

export default App;
