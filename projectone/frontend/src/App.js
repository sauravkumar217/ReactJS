import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Products from "./components/ProductList";
import Orders from "./components/Order";
import AdminDashboard from "./components/AdminDashboard";

const App = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuth(!!token); // ✅ If token exists, set auth to true
  }, []);

  return (
    <Routes>
      {/* ✅ Show Signup first, Home only if authenticated */}
      <Route path="/" element={auth ? <Home /> : <Navigate to="/signup" />} />
      <Route path="/signup" element={<Signup setAuth={setAuth} />} />
      <Route path="/products" element={auth ? <Products /> : <Navigate to="/signup" />} />
      <Route path="/order" element={auth ? <Orders /> : <Navigate to="/signup" />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
};

export default App;
