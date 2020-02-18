import React, { useState } from "react";
const UseState = () => {
  const [color, setColor] = useState("white");
  return (
    <div style={{ padding: "10px", backgroundColor: color }}>
      <button
        onClick={() => {
          setColor("White");
        }}
      >
        White
      </button>
      <button
        onClick={() => {
          setColor("Black");
        }}
      >
        Black
      </button>
    </div>
  );
};
