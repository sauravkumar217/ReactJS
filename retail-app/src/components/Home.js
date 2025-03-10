// src/components/Home.js
import React from 'react';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Retail App</h1>
      <p>
        <a href="/signup">Sign Up</a> or <a href="/login">Login</a> to get started!
      </p>
    </div>
  );
};

export default Home;