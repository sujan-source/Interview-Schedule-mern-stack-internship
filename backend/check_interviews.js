const mongoose = require("mongoose");
const Interview = require("./models/Interview");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/interview-scheduler";

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log("✅ DB Connected");
        const interviews = await Interview.find({});
        console.log(`\n📊 Total Interviews Found: ${interviews.length}`);
        interviews.forEach(i => {
            console.log(`- [${i.date}] ${i.candidate} (${i.position})`);
        });
        console.log("-----------------\n");
        mongoose.connection.close();
    })
    .catch(err => console.error(err));
