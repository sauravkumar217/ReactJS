// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import item1 from '../assets/item1.jpeg';
import item2 from '../assets/item2.jpeg';
import item3 from '../assets/item3.jpeg';
import item4 from '../assets/item4.jpeg';

const Dashboard = () => {
  const navigate = useNavigate();

  // Sample items data (replace with your actual data or fetch from an API)
  const items = [
    { id: 1, name: 'Headphone', price: '₹999', image: item1 },
    { id: 2, name: 'Keyboard', price: '₹1599', image: item2 },
    { id: 3, name: 'Shoes', price: '₹2999', image: item3 },
    { id: 4, name: 'Mobile', price: '₹1199', image: item4 },
  ];

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token (if using localStorage)
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Welcome to the Shopping Dashboard</h1>
        <nav>
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      {/* Grid of Items */}
      <div className="items-grid">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;