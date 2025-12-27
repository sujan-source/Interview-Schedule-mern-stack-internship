const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/interview-scheduler";

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log("✅ DB Connected");
        const users = await User.find({});
        console.log("\n--- USER LIST ---");
        users.forEach(u => {
            console.log(`ID: ${u._id} | Email: ${u.email} | Name: "${u.name || 'MISSING'}" | Role: ${u.role}`);
        });
        console.log("-----------------\n");
        mongoose.connection.close();
    })
    .catch(err => console.error(err));
