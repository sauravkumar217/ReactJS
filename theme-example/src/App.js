import React, { Suspense } from "react";
import { ThemeProvider, useTheme } from "./ThemeContext";
import './App.css';

// Lazy load the components
const About = React.lazy(() => import("./About"));
const Contact = React.lazy(() => import("./Contact"));

const App = () => {
  return (
    <ThemeProvider>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Home />
      </Suspense>
    </ThemeProvider>
  );
};

const Home = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="home-container">
      <h1 className="welcome-text">Welcome to the {theme} theme!</h1>
      <button onClick={toggleTheme} className="theme-button">Toggle Theme</button>
      <Suspense fallback={<div className="loading">Loading about section...</div>}>
        <About />
      </Suspense>
      <Suspense fallback={<div className="loading">Loading contact section...</div>}>
        <Contact />
      </Suspense>
    </div>
  );
};

export default App;