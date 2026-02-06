const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user", "interviewer"], default: "user" },
    profile: {
        bio: { type: String },
        contactNo: { type: String },
        timezone: { type: String },
        resumeUrl: { type: String }
    },
    availability: [
        {
            day: { type: String },
            slots: [{ type: String }]
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
