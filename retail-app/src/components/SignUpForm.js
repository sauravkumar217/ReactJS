// src/components/SignUpForm.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

const schema = yup.object({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignUpForm = () => {
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      console.log('Sending request to http://localhost:3001/register with data:', data);
      const response = await axios.post('http://localhost:3001/register', {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      console.log('Response from backend:', response.data);
      setSubmissionStatus(response.data.message || 'Registration successful! Redirecting...');
      setTimeout(() => (window.location.href = '/'), 2000);
    } catch (error) {
      setSubmissionStatus(
        error.response?.data?.error || 'Registration failed. Please try again.'
      );
      console.error('Error registering user:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config,
      });
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Username</label>
          <input {...register('username')} />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" {...register('password')} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        {submissionStatus && (
          <p className={`status-message ${submissionStatus.includes('successful') ? 'success' : 'error'}`}>
            {submissionStatus}
          </p>
        )}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;