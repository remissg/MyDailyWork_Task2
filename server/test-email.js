const sendEmail = require('./utils/sendEmail');
require('dotenv').config();

// Test email sending
const testEmail = async () => {
    try {
        console.log('Testing email configuration...');
        console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
        console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
        console.log('EMAIL_USER:', process.env.EMAIL_USER);
        console.log('EMAIL_FROM:', process.env.EMAIL_FROM);

        await sendEmail({
            email: 'test@example.com',
            subject: 'Test Email',
            message: '<h1>Test Email</h1><p>This is a test email from Job Portal</p>'
        });

        console.log('✅ Email sent successfully!');
    } catch (error) {
        console.error('❌ Email test failed:', error.message);
        console.error('Full error:', error);
    }
};

testEmail();
