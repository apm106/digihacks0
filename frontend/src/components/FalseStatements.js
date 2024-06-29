import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import "../App.css"; 

const phrases = [
  "Apples cause cancer",
  "Vaccines cause autism",
  "5G towers spread COVID-19"
];

function FalseStatements() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedPhrase, setDisplayedPhrase] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [blinkerVisible, setBlinkerVisible] = useState(true);

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
    <Box className="false-statements">
      <h1 className="typing-effect">
        {displayedPhrase}
        {isTypingComplete && <span className="cross-out"></span>}
        <span className="blinker">{blinkerVisible ? "|" : ""}</span>
      </h1>
    </Box>
  );
}

export default FalseStatements;
