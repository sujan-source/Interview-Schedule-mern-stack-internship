const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema({
    candidate: { type: String, required: true },
    interviewer: { type: String, required: true },
    position: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    type: { type: String, enum: ["zoom", "teams", "in-person"], required: true },
    meetingLink: { type: String },
    status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" },
    feedback: {
        rating: { type: Number },
        comments: { type: String }
    },
    round: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Interview", InterviewSchema);
