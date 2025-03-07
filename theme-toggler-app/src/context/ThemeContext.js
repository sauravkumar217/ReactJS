import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const appStyle = {
    backgroundColor: theme === "light" ? "#ffffff" : "#333333",
    color: theme === "light" ? "#000000" : "#ffffff",
    height: "100vh",
    width: "100vw",
    margin: 0,
    padding: 0,
    transition: "background-color 0.3s ease",
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={appStyle}>{children}</div>
    </ThemeContext.Provider>
  );
}