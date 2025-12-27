const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env variables
dotenv.config();

// Import routes (IMPORT ONCE)
const authRoutes = require("./routes/auth");
const interviewRoutes = require("./routes/interview");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Interview Scheduler Backend is running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/interviews", interviewRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
