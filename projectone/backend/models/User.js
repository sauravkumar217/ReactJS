const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['customer', 'admin'], 
    default: 'customer' 
  }, // Added 'role' field to determine user type
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
