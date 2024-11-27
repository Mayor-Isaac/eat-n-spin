import React from "react";

export default function Button({ children, btnFunc }) {
  return (
    <button className="button" onClick={btnFunc}>
      {children}
    </button>
  );
}
