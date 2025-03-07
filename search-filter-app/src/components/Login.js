import React from 'react';

const Login = ({ 
  isDarkMode, 
  username, 
  setUsername, 
  password, 
  setPassword, 
  handleLogin, 
  loginError 
}) => {
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
};

export default Login;