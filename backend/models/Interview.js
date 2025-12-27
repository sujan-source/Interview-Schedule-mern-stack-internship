const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  candidate: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  interviewer: String
});

module.exports = mongoose.model("Interview", interviewSchema);

