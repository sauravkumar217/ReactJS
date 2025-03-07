import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function About() {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>About</h1>
      <p>This is the About page. The current theme is: {theme}</p>
    </div>
  );
}