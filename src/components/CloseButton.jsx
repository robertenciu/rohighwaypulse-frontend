import React from "react";

function CloseButton({ onClick, style = {} }) {
  return (
    <i
      className="bi bi-x-lg"
      onClick={onClick}
      style={{
        cursor: "pointer",
        position: "absolute",
        top: "5px",
        right: "10px",
        fontSize: "2rem",
        ...style,
      }}
    ></i>
  );
}

export default CloseButton;
