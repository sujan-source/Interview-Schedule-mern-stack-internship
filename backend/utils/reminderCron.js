const cron = require('node-cron');
const Interview = require('../models/Interview');
const { sendEmail } = require('./emailService');
const moment = require('moment');

const startReminderCron = () => {
    // Run every hour
    cron.schedule('0 * * * *', async () => {
        console.log('Running interview reminders check...');

        const upcoming = await Interview.find({
            status: 'scheduled',
            date: {
                $gte: new Date(),
                $lte: moment().add(24, 'hours').toDate()
            }
        });

        for (const interview of upcoming) {
            console.log(`Upcoming interview found for ${interview.candidate} - ${interview.position}`);
            // Note: Email reminders are currently disabled because candidate/interviewer are text format names.
        }
    });
};

module.exports = { startReminderCron };
