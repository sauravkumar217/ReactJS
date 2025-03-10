// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Dashboard from './components/Dashboard'; // Import the Dashboard component
import './App.css';

// ProtectedRoute component to restrict access to authenticated users
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check for token in localStorage
  return token ? children : <Navigate to="/login" />; // Redirect to login if no token
};

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />

          {/* Protected Route - Only accessible if user is logged in */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route - Redirect to Home if no route matches */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;