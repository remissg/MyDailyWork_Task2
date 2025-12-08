const sendEmailNotification = async (type, toUser, data) => {
    // Placeholder for email service
    console.log(`[Email Notification] Type: ${type}`);
    console.log(`To: ${toUser.email} (${toUser.name})`);
    console.log(`Data: ${JSON.stringify(data)}`);
};

module.exports = sendEmailNotification;
