const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

const MONGO_URI_IPV4 = "mongodb://127.0.0.1:27017/interview-scheduler";
const MONGO_URI_HOST = "mongodb://localhost:27017/interview-scheduler";

const connectDB = async () => {
    try {
        console.log("Attempting to connect to 127.0.0.1...");
        await mongoose.connect(MONGO_URI_IPV4, { serverSelectionTimeoutMS: 2000 });
        console.log("✅ Custom DB Connected (via 127.0.0.1)");
    } catch (err) {
        try {
            console.log("127.0.0.1 failed, attempting to connect to localhost...");
            await mongoose.connect(MONGO_URI_HOST, { serverSelectionTimeoutMS: 2000 });
            console.log("✅ Custom DB Connected (via localhost)");
        } catch (err2) {
            console.error("❌ DB Connection Error: Could not connect to MongoDB on 127.0.0.1 or localhost.");
            console.error("👉 Make sure you have started MongoDB by running 'start_db.bat' in a separate terminal.");
            process.exit(1);
        }
    }
};

const createAdmin = async () => {
    try {
        const email = "superadmin@test.com";
        const password = "password123";
        const role = "admin";

        // Check if exists
        let user = await User.findOne({ email });

        if (user) {
            console.log("⚠️ User superadmin@test.com already exists. Updating role and password...");
            const hashedPassword = await bcrypt.hash(password, 10);
            user.role = "admin";
            user.password = hashedPassword;
            await user.save();
        } else {
            console.log("🆕 Creating new Admin user...");
            const hashedPassword = await bcrypt.hash(password, 10);
            user = new User({
                email,
                password: hashedPassword,
                name: "Super Admin",
                role: "admin"
            });
            await user.save();
        }

        console.log("\n===========================================");
        console.log("✅ SUCCESS! ADMIN ACCOUNT READY.");
        console.log("📧 Email:    superadmin@test.com");
        console.log("🔑 Password: password123");
        console.log("===========================================\n");

    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        mongoose.connection.close();
    }
};

const start = async () => {
    await connectDB();
    await createAdmin();
};

start();
