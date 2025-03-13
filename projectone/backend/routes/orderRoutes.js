const express = require("express");
const Order = require("../models/orderModel"); // Import your Order model
const router = express.Router();

router.post("/place", async (req, res) => {
  const { products, totalAmount } = req.body;
  const userId = req.user.id; // Assuming the user ID is attached to the request from middleware

  if (!products || !totalAmount) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const order = new Order({
      products,
      totalAmount,
      user: userId,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to place order." });
  }
});

module.exports = router;
