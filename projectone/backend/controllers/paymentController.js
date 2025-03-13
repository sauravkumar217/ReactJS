exports.processPayment = async (req, res) => {
    try {
      const { userId, orderId, amount } = req.body;
  
      // Simulating a payment process
      if (!userId || !orderId || !amount) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      res.status(200).json({ message: "Payment processed successfully" });
    } catch (error) {
      res.status(500).json({ error: "Payment failed" });
    }
  };
  