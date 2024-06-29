import React from "react";
import microscopeImage from "./icons/microscope.png";
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
        width: "40px",
        height: "40px",
      }}
    >
      <img
        src={microscopeImage}
        alt="Microscope"
        style={{
          width: "100%",
          height: "100%",
          transition: "transform 0.3s ease-in-out",
        }}
        className="microscope-img"
      />
    </button>
  );
}
