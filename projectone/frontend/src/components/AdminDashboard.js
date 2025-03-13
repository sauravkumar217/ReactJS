import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './AdminPage.css';  // Import the CSS file

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const navigate = useNavigate();

  // Fetch all products when the page loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5003/api/products", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setProducts(data);
        } else {
          setError(data.error || "Failed to fetch products.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
    };

    fetchProducts();
  }, []);

  // Handle input changes for the new product form
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Add or update product
  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const { name, description, price, imageUrl } = newProduct;

    if (!name || !description || !price || !imageUrl) {
      setError("All fields are required.");
      return;
    }

    try {
      let res;
      let data;

      if (isEditing) {
        // Update product
        res = await fetch(`http://localhost:5003/api/products/update/${productToEdit._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(newProduct),
        });
      } else {
        // Add new product
        res = await fetch("http://localhost:5003/api/products/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(newProduct),
        });
      }

      data = await res.json();

      if (res.ok) {
        setError("");
        setNewProduct({ name: "", description: "", price: "", imageUrl: "" });
        if (isEditing) {
          setProducts(products.map((product) =>
            product._id === productToEdit._id ? data.product : product
          ));
          setIsEditing(false);
          setProductToEdit(null);
        } else {
          setProducts([...products, data.product]);
        }
      } else {
        setError(data.error || "Failed to save product.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        console.log("Deleting product with ID:", id);  // Debugging line
        const res = await fetch(`http://localhost:5003/api/products/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        const data = await res.json();
        console.log("Response from delete:", data);  // Debugging line
  
        if (res.ok) {
          setProducts(products.filter((product) => product._id !== id));
        } else {
          setError(data.error || "Failed to delete product.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  
  // Handle edit button click
  const handleEditProduct = (product) => {
    setIsEditing(true);
    setProductToEdit(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.image,
    });
  };

  return (
    <div className="admin-container">
      <h1 className="admin-header">Admin Dashboard</h1>
      {error && <p className="alert alert-danger">{error}</p>}

      <div className="form-container">
        <h3>{isEditing ? "Edit Product" : "Add New Product"}</h3>
        <form onSubmit={handleProductSubmit} className="product-form">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="input-field"
          />
          <input
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            placeholder="Product Description"
            className="input-field"
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="input-field"
          />
          <input
            type="text"
            name="imageUrl"
            value={newProduct.imageUrl}
            onChange={handleInputChange}
            placeholder="Image URL"
            className="input-field"
          />
          <button type="submit" className="submit-button">
            {isEditing ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      <h3>Product List</h3>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <div className="button-group">
              <button onClick={() => handleEditProduct(product)} className="edit-btn">Edit</button>
              <button onClick={() => handleDeleteProduct(product._id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
