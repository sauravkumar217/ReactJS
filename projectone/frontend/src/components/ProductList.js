import React, { useEffect, useState } from "react";
import "./ProductList.css"; // ✅ Import CSS for styling

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5003/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Debugging: Check if the data structure is correct
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="container">
      <h2 className="page-title">Explore Our Latest Paints</h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.image || "default-image-url.jpg"} // Fallback image URL
                alt={product.name}
                className="product-img"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">₹{product.price}</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products available.</p> // Display message if no products are fetched
        )}
      </div>
    </div>
  );
};

export default ProductList;
