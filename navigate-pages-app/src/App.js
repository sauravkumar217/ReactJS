import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Post from './components/Post';
import NotFound from './components/NotFound';

// Navbar component with Random Post button
const Navbar = () => {
  const navigate = useNavigate();

  const handleRandomPost = () => {
    const randomId = Math.floor(Math.random() * 100) + 1; // Random post ID (1-100)
    navigate(`/post/${randomId}`);
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/about" className="nav-link">About</Link></li>
        <li><Link to="/contact" className="nav-link">Contact</Link></li>
        <li>
          <button onClick={handleRandomPost} className="nav-button">
            Random Post
          </button>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;