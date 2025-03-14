const express = require("express");
const User = require("../models/User"); // Your User model
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/google-login", async (req, res) => {
  const { email, name, image } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // If user doesn't exist, register them
      user = new User({ email, name, image });
      await user.save();
    }

    // Generate JWT for backend authentication
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ success: true, userId: user._id, token });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
