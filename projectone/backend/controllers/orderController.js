const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;
    const order = new Order({ userId, products, totalAmount });
    await order.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error placing order" });
  }
};
