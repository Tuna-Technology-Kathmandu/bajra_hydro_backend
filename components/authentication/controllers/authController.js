const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../helper/authValidator');
const User = require('../../users/models/User');

// Register User
const registerUser = async (req, res) => {
  try {
    // Validate input
    const { error } = registerValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { fullname, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    // Validate input
    const { error } = loginValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, unique_id: user.unique_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    // Optional: Update last login
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        unique_id: user.unique_id
      }
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = {
  registerUser,
  loginUser
};
