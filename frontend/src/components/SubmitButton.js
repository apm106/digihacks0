import React from "react";
import microscopeImage from "../microscope.png";
import "./SubmitButton.css";

export default function SubmitButton({ onClick }) {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 0,
        margin: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px", // Adjust width to fit the image
        height: "40px", // Adjust height to fit the image
      }}
    >
      <img
        src={microscopeImage}
        alt="Microscope"
        style={{
          marginRight: "15px",
          width: "100%", // Make the image fit the button
          height: "100%", // Make the image fit the button
          transition: "transform 0.3s ease-in-out", // Smooth transition for glow effect
        }}
        className="microscope-img"
      />
    </button>
  );
}
