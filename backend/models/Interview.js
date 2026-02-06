const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  candidate: {
    type: String,
    required: true
  },
  interviewer: {
    type: String
  },
  position: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String, // e.g., "10:00"
    required: true
  },
  endTime: String,
  type: {
    type: String,
    enum: ["in-person", "zoom", "teams", "phone"],
    default: "zoom"
  },
  meetingLink: String,
  status: {
    type: String,
    enum: ["pending", "scheduled", "completed", "cancelled"],
    default: "pending"
  },
  round: {
    type: String,
    enum: ["screening", "technical", "hr"],
    default: "screening"
  },
  feedback: {
    rating: Number,
    comments: String
  },
  timezone: {
    type: String,
    default: "UTC"
  }
}, { timestamps: true });

module.exports = mongoose.model("Interview", interviewSchema);

