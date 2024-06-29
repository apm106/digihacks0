import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Input from "./components/Input";
import "./App.css"; // Import custom styles

function App() {
  const phrases = [
    "Apples cause cancer",
    "Vaccines cause autism",
    "5G towers spread COVID-19",
  ];

  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedPhrase, setDisplayedPhrase] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

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

  // Effect to change the header text with typing and cross-out animation
  useEffect(() => {
    const phraseToType = phrases[currentPhraseIndex];
    let timeout;

    if (!isTypingComplete) {
      timeout = setTimeout(() => {
        setDisplayedPhrase((prevPhrase) =>
          phraseToType.slice(0, prevPhrase.length + 1)
        );
      }, 150); // Adjust typing speed here (milliseconds)

      if (displayedPhrase === phraseToType) {
        setIsTypingComplete(true);

        // Cross-out animation after typing complete
        setTimeout(() => {
          setIsTypingComplete(false);
          setCurrentPhraseIndex((prevIndex) =>
            prevIndex === phrases.length - 1 ? 0 : prevIndex + 1
          );
          setDisplayedPhrase("");
        }, 2000); // Time before next phrase (milliseconds)
      }
    }

    return () => clearTimeout(timeout);
  }, [currentPhraseIndex, displayedPhrase, isTypingComplete]);

  return (
    <Box className="app-container">
      <Box className="header">
        <h1 className="typing-effect">
          {displayedPhrase}
          {isTypingComplete && <span className="cross-out"></span>}
        </h1>
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
