const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];  // Extract the token

  if (!token) {
    return res.status(403).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
    if (decoded.role !== "admin") {  // Assuming you store user role in the token
      return res.status(403).json({ error: "Admin access required" });
    }

    req.user = decoded;  // Attach the user info to the request
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = { verifyAdmin };
