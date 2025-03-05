import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Modern React App</h1>
      </header>

      <main className="main-content">
        <div className="card">
          <h2>Welcome</h2>
          <p>This is a clean, responsive design built with pure CSS and React.</p>
          <button className="action-button">Click Me</button>
        </div>
      </main>

      <footer className="footer">
        <p>© 2025 Saurav Kumar. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;