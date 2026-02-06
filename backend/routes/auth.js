const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const multer = require('multer');
const path = require('path');
const authMiddleware = require("../middleware/authMiddleware");

// Multer storage for resumes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

/* SIGNUP */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRole = role || (email.includes("admin") ? "admin" : "user");

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: userRole
    });
    await user.save();

    // Generate Token
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate Token
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* GET INTERVIEWERS */
router.get("/interviewers", authMiddleware, async (req, res) => {
  try {
    const interviewers = await User.find({ role: { $in: ['interviewer', 'admin'] } }).select('name email availability profile');
    res.json(interviewers);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* GET CANDIDATES */
router.get("/candidates", authMiddleware, async (req, res) => {
  try {
    const candidates = await User.find({ role: 'user' }).select('name email');
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* UPDATE PROFILE */
router.put("/profile", authMiddleware, upload.single('resume'), async (req, res) => {
  try {
    const { bio, contactNo, timezone, availability } = req.body;
    const updateData = {
      profile: {
        bio,
        contactNo,
        timezone,
        resumeUrl: req.file ? `/uploads/${req.file.filename}` : undefined
      }
    };

    if (availability) {
      updateData.availability = JSON.parse(availability);
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

