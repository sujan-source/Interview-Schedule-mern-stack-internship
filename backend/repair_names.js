const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/interview-scheduler";

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log("✅ DB Connected for Repair...");

        // Find users with missing names
        const users = await User.find({ $or: [{ name: { $exists: false } }, { name: "" }] });

        console.log(`🔍 Found ${users.length} users with missing names.`);

        for (const u of users) {
            // Derive name from email (e.g., guhan@test.com -> Guhan)
            let newName = u.email.split("@")[0];
            newName = newName.charAt(0).toUpperCase() + newName.slice(1);

            u.name = newName;
            await u.save();
            console.log(`🛠 Fixed: ${u.email} -> Name set to "${newName}"`);
        }

        console.log("\n✅ ALL NAMES REPAIRED!");
        console.log("👉 Now please Logout and Login again.");
        mongoose.connection.close();
    })
    .catch(err => console.error(err));
