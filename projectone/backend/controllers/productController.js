const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const product = new Product({ name, price, description, category });
    await product.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding product" });
  }
};
