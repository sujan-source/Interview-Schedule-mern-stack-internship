const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/interview-scheduler";

const verify = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        const users = await User.find({}, { password: 0 }); // Don't show password hashes
        console.log("\n--- Registered Users ---");
        if (users.length === 0) {
            console.log("No users found in database.");
        } else {
            console.table(users.map(u => ({
                id: u._id,
                name: u.name,
                email: u.email,
                role: u.role
            })));
        }
        console.log("------------------------\n");
    } catch (err) {
        console.error("Connection Error:", err.message);
    } finally {
        mongoose.connection.close();
    }
};

verify();
