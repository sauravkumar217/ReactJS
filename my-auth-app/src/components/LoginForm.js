import React, { useState } from 'react';
import '../App.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission from refreshing
    
    // Trim inputs to avoid whitespace issues
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Log for debugging
    console.log('Email entered:', trimmedEmail);
    console.log('Password entered:', trimmedPassword);

    // Validation
    if (!trimmedEmail || !trimmedPassword) {
      setErrorMessage('Please fill out both fields.');
      return;
    }

    // Check credentials
    if (trimmedEmail === 'user@example.com' && trimmedPassword === 'password') {
      setErrorMessage('');
      alert('Login successful!');
      setEmail(''); // Reset form
      setPassword('');
    } else {
      setErrorMessage('Invalid credentials.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default LoginForm;