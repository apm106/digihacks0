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
        padding: "10px",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        position: "relative", // Ensure positioning for glow effect
      }}
    >
      <img
        src={microscopeImage}
        alt="Microscope"
        style={{
          width: 60,
          height: 60,
          transition: "transform 0.3s ease-in-out", // Smooth transition for glow effect
        }}
        className="microscope-img"
      />
    </button>
  );
}
