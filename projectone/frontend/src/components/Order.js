import React, { useState, useEffect } from "react";
import "./Order.css"; // ✅ Import CSS for styling

const Order = () => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    const dummyCart = [
      { _id: "1", name: "Luxury Wall Paint", description: "Matte finish, durable and long-lasting.", price: 1200, quantity: 1, image: "https://via.placeholder.com/80" },
      { _id: "2", name: "Premium Oil Paint", description: "High-gloss oil paint for smooth surfaces.", price: 1800, quantity: 2, image: "https://via.placeholder.com/80" },
    ];
    setCart(dummyCart);
    calculateTotal(dummyCart);
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  const updateQuantity = (id, qty) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: qty } : item
    );
    setCart(updatedCart);
    calculateTotal(updatedCart);
  };

  const placeOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setOrderStatus("❌ Unauthorized. Please login first.");
      return;
    }

    const res = await fetch("http://localhost:5003/api/order/place", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        products: cart.map(({ _id, quantity }) => ({ productId: _id, quantity })),
        totalAmount,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setOrderStatus("✅ Order placed successfully!");
      setCart([]);
    } else {
      setOrderStatus("❌ Failed to place order: " + data.error);
    }
  };

  return (
    <div className="order-container">
      <h2 className="order-title text-center mb-4">🛒 Your Order</h2>

      {cart.length === 0 ? (
        <p className="empty-cart text-center">Your cart is empty.</p>
      ) : (
        <div className="order-items">
          {cart.map((item) => (
            <div key={item._id} className="order-item">
              <img src={item.image} alt={item.name} className="order-img" />
              <div className="order-details">
                <h4 className="order-item-title">{item.name}</h4>
                <p className="order-item-description">{item.description}</p>
                <p className="order-item-price">₹{item.price}</p>
                <div className="quantity-selector">
                  <button
                    onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="order-summary">
        <h4 className="total-amount">Total: ₹{totalAmount}</h4>
        <button className="place-order-btn" onClick={placeOrder}>
          Place Order
        </button>
        {orderStatus && <p className="order-status">{orderStatus}</p>}
      </div>
    </div>
  );
};

export default Order;
