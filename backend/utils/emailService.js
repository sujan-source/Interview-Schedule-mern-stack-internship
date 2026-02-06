const nodemailer = require('nodemailer');

const transporter = (process.env.EMAIL_USER && process.env.EMAIL_PASS) ? nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
}) : null;

const sendEmail = async (to, subject, text, html) => {
    if (!transporter) {
        console.warn('Email service not configured. Skipping email to:', to);
        return;
    }
    try {
        const info = await transporter.sendMail({
            from: `"Interview System" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        });
        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = { sendEmail };
