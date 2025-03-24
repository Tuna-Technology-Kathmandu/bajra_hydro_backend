const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginValidation } = require("../helper/authValidator");
const User = require("../../users/models/User");

// Login User
const loginUser = async (req, res) => {
  try {
    // Validate input
    const { error, value } = loginValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if user exists
    const user = await User.findOne({ email: value.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { unique_id: user.unique_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
    );

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

module.exports = loginUser;
