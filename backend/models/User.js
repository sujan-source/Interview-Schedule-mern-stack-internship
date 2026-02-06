const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin", "interviewer"], default: "user" },
  profile: {
    bio: String,
    contactNo: String,
    resumeUrl: String,
    timezone: { type: String, default: "UTC" }
  },
  availability: [{
    day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
    slots: [{
      start: String, // e.g., "09:00"
      end: String    // e.g., "10:00"
    }]
  }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

