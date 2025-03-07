import React, { useState, useEffect } from 'react';
import './App.css'; // Import global CSS

const SearchFilterWithTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Sample data
  const items = [
    "JavaScript Framework",
    "React Components",
    "CSS Animations",
    "UI/UX Design",
    "Responsive Layout",
    "State Management",
    "Modern Typography",
    "Design Systems",
    "Frontend Development",
    "Theme Customization"
  ];

  // Sample user credentials (in a real app, this would come from a backend)
  const validUser = {
    username: "user123",
    password: "pass123"
  };

  // Filter items based on search term with delay
  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      const delaySearch = setTimeout(() => {
        const results = items.filter(item =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(results);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(delaySearch);
    }
  }, [searchTerm, isLoggedIn]);

  // Set initial filtered items when logged in
  useEffect(() => {
    if (isLoggedIn) {
      setFilteredItems(items);
    }
  }, [isLoggedIn]);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-theme', !isDarkMode);
  };

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === validUser.username && password === validUser.password) {
      setIsLoggedIn(true);
      setLoginError('');
      setUsername('');
      setPassword('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setSearchTerm('');
    setFilteredItems([]);
  };

  if (!isLoggedIn) {
    return (
      <div className={`container ${isDarkMode ? 'dark' : ''}`}>
        <div className="login-container">
          <h2 className="title">Login</h2>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            <button type="submit" className="login-button">Login</button>
            {loginError && <div className="error-message">{loginError}</div>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${isDarkMode ? 'dark' : ''}`}>
      <div className="header">
        <h2 className="title">Search Filter</h2>
        <div className="user-controls">
          <span className="username">Welcome, {validUser.username}</span>
          <div className="toggle-container">
            <input 
              type="checkbox" 
              checked={isDarkMode} 
              onChange={toggleTheme} 
              className="toggle-input"
              id="themeToggle"
            />
            <label htmlFor="themeToggle" className="toggle-slider">
              <span className="toggle-knob"></span>
            </label>
          </div>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <svg
          width="20"
          height="20"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="search-icon"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <svg width="24" height="24" viewBox="0 0 24 24" className="spinner">
            <circle 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4" 
              fill="none" 
              strokeDasharray="30 60"
            />
          </svg>
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="list-container">
          {filteredItems.map((item, index) => (
            <div key={index} className="list-item">
              {item}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">No results found</div>
      )}
    </div>
  );
};

export default SearchFilterWithTheme;