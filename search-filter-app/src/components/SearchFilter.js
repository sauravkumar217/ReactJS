import React from 'react';

const SearchFilter = ({ 
  isDarkMode, 
  toggleTheme, 
  handleLogout, 
  username, 
  searchTerm, 
  setSearchTerm, 
  isLoading, 
  filteredItems 
}) => {
  return (
    <div className={`container ${isDarkMode ? 'dark' : ''}`}>
      <div className="header">
        <h2 className="title">Search Filter</h2>
        <div className="user-controls">
          <span className="username">Welcome, {username}</span>
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

export default SearchFilter;