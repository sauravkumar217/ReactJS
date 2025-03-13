const express = require("express");
const { processPayment } = require("../controllers/paymentController"); // ✅ Make sure this path is correct

const router = express.Router();

router.post("/pay", processPayment); // ✅ Ensure processPayment is correctly imported

module.exports = router;
