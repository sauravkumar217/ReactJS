// src/components/LoginForm.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm = () => {
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmit = async (data) => {
    try {
      console.log('Sending login request to http://localhost:3001/login with data:', data);
      const response = await axios.post('http://localhost:3001/login', {
        email: data.email,
        password: data.password,
      });
      console.log('Response from backend:', response.data);

      // Save the token to localStorage (assuming the backend sends a token)
      localStorage.setItem('token', response.data.token);

      // Set success message and redirect to Dashboard after 2 seconds
      setSubmissionStatus('Login successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      // Handle errors
      setSubmissionStatus(
        error.response?.data?.error || 'Login failed. Please try again.'
      );
      console.error('Error logging in:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config,
      });
    }
  };

  return (
    <div className="signup-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Email</label>
          <input {...register('email')} />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" {...register('password')} />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>
        {submissionStatus && (
          <p className={`status-message ${submissionStatus.includes('successful') ? 'success' : 'error'}`}>
            {submissionStatus}
          </p>
        )}
        <button type="submit">Login</button>
        <p>
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;