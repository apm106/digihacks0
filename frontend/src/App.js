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
  const [blinkerVisible, setBlinkerVisible] = useState(true);

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

  useEffect(() => {
    const phraseToType = phrases[currentPhraseIndex];
    let timeout;

    if (!isTypingComplete) {
      timeout = setTimeout(() => {
        setDisplayedPhrase((prevPhrase) =>
          phraseToType.slice(0, prevPhrase.length + 1)
        );
      }, 150);

      if (displayedPhrase === phraseToType) {
        setIsTypingComplete(true);

        const blinkerInterval = setInterval(() => {
          setBlinkerVisible((prevVisible) => !prevVisible);
        }, 500);

        setTimeout(() => {
          clearInterval(blinkerInterval);
          setBlinkerVisible(false);
          setTimeout(() => {
            setIsTypingComplete(false);
            setCurrentPhraseIndex((prevIndex) =>
              prevIndex === phrases.length - 1 ? 0 : prevIndex + 1
            );
            setDisplayedPhrase(
              phrases[(currentPhraseIndex + 1) % phrases.length][0]
            );
          }, 100);
        }, 3000);
      }

      return () => clearTimeout(timeout);
    }
  }, [currentPhraseIndex, displayedPhrase, isTypingComplete]);

  return (
    <Box className="app-container">
      <Box className="header">
        <h1 className="typing-effect">
          {displayedPhrase}
          {isTypingComplete && <span className="cross-out"></span>}
          <span className="blinker">{blinkerVisible ? "|" : ""}</span>
        </h1>
      </Box>
      <Box className="misinformation">STOP THE SPREAD OF MISINFORMATION</Box>
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
