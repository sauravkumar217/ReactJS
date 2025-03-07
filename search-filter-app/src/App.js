import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import SearchFilter from './components/SearchFilter';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

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

  const validUser = {
    username: "saurav123",
    password: "pass123"
  };

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

  useEffect(() => {
    if (isLoggedIn) {
      setFilteredItems(items);
    }
  }, [isLoggedIn]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-theme', !isDarkMode);
  };

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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSearchTerm('');
    setFilteredItems([]);
  };

  if (!isLoggedIn) {
    return (
      <Login
        isDarkMode={isDarkMode}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        loginError={loginError}
      />
    );
  }

  return (
    <SearchFilter
      isDarkMode={isDarkMode}
      toggleTheme={toggleTheme}
      handleLogout={handleLogout}
      username={validUser.username}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      isLoading={isLoading}
      filteredItems={filteredItems}
    />
  );
};

export default App;