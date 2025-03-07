import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: theme === "light" ? "#e0e0e0" : "#555555",
    border: "none",
    borderRadius: "5px",
    color: theme === "light" ? "#000000" : "#ffffff",
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Home</h1>
      <p>Current Theme: {theme}</p>
      <button
        style={buttonStyle}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        Toggle Theme
      </button>
    </div>
  );
}