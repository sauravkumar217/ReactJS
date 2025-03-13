const express = require("express");
const Product = require("../models/Product"); // Ensure this model exists
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // Import auth middleware to verify admin

// ✅ Fetch all products (this route already exists in your project)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch products from MongoDB
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

// ✅ Add new product (admin only)
router.post("/add", authMiddleware.verifyAdmin, async (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  if (!name || !description || !price || !imageUrl) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: "Error adding product" });
  }
});

// ✅ Delete product (admin only)
router.delete("/:id", authMiddleware.verifyAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
});

module.exports = router;
