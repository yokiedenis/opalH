const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

// Login (for admin and customers)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password (in production, use bcrypt for hashing)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role, // admin, customer
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register (for customers)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password, // In production, hash this with bcrypt
      phone,
      role: "customer",
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin Login (specific endpoint for admin)
router.post("/admin-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find admin user
    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    // Check password
    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role,
        name: admin.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
