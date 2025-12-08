const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (options) => {
    try {
        // Determine which email config to use based on environment
        const isDevelopment = process.env.NODE_ENV === 'development';

        const emailConfig = {
            host: isDevelopment ? process.env.EMAIL_HOST_DEV : process.env.EMAIL_HOST_PROD,
            port: parseInt(isDevelopment ? process.env.EMAIL_PORT_DEV : process.env.EMAIL_PORT_PROD),
            auth: {
                user: isDevelopment ? process.env.EMAIL_USER_DEV : process.env.EMAIL_USER_PROD,
                pass: isDevelopment ? process.env.EMAIL_PASS_DEV : process.env.EMAIL_PASS_PROD
            }
        };

        console.log(`📧 Sending email via ${isDevelopment ? 'Mailtrap (Test)' : 'Production SMTP'}...`);

        // Create transporter
        const transporter = nodemailer.createTransport(emailConfig);

        // Verify connection
        await transporter.verify();
        console.log('✅ SMTP connection verified');

        // Define email options
        const mailOptions = {
            from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
            to: options.email,
            subject: options.subject,
            html: options.message
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);

        console.log('✅ Message sent: %s', info.messageId);
        if (isDevelopment) {
            console.log('📬 Check your Mailtrap inbox at https://mailtrap.io');
        }
        return info;
    } catch (error) {
        console.error('❌ Email sending error:', error);
        throw error;
    }
};

module.exports = sendEmail;
