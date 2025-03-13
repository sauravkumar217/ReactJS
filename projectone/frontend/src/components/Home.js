import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";  // Make sure to create a custom CSS file for dark mode and other styles

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Redirect to login if user is not authenticated
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={`container-fluid ${darkMode ? "dark-mode" : ""}`}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <h2 className="navbar-brand">Paint Store</h2>
          <div className="navbar-nav">
            <Link className="nav-link" to="/products">Products</Link>
            <Link className="nav-link" to="/order">Orders</Link>
            <button className="btn btn-outline-light ms-2" onClick={handleDarkModeToggle}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </nav>

      <header className="text-center py-5">
        <h1>Welcome to the Paint Store!</h1>
        <p className="lead">Discover the best paints for your home and office.</p>
        <div>
          <Link to="/products" className="btn btn-primary mx-2">Browse Products</Link>
          <Link to="/order" className="btn btn-secondary mx-2">My Orders</Link>
        </div>
      </header>

      {/* Search and Filter Section */}
      <div className="row">
        <div className="col-md-6 mx-auto">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search for Paints..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Catalog Section */}
      <div className="row">
        {/* Example of Paint Items - Ideally you'd fetch this list from an API */}
        {[...Array(6)].map((_, index) => (
          <div key={index} className="col-md-4">
            <div className="card">
              <img src="https://via.placeholder.com/150" alt="paint" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Paint Color {index + 1}</h5>
                <p className="card-text">Description of the paint color here.</p>
                <Link to={`/products/${index + 1}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Wishlist and Favorites */}
      <div className="mt-5">
        <h3>Your Wishlist</h3>
        <p>View your favorite paints here.</p>
        <Link to="/wishlist" className="btn btn-info">View Wishlist</Link>
      </div>

      {/* Optional Cart & Checkout */}
      <div className="mt-5">
        <h3>Shopping Cart</h3>
        <p>View your shopping cart and proceed to checkout.</p>
        <Link to="/cart" className="btn btn-success">Go to Cart</Link>
      </div>
    </div>
  );
};

export default Home;
