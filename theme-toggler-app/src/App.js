import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import About from "./components/About";

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <nav>
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/about" activeClassName="active">
            About
          </NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<ThemeSwitcher />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}