const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { json } = require("express");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public

const registerUser = async (req, res) => {
  console.log("Register endpoint hit", req.body);
  try {
    const { name, email, password, profileImageUrl } = 
    req.body;

    //check if user aleready exists
    console.log("Checking if user exists...");
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    //  hash pass
    console.log("Hashing password...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    console.log("Creating new user...");
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl
    });
    console.log("User created:", user);

    // return user data with JWT
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "server error", error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public

const loginUser = async (req, res) => {


  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// desc    Get user profile
// route   GET /api/auth/profile
// access  Private (Requires JWT)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = { registerUser, loginUser, getUserProfile };