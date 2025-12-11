// Contact form controller
const Contact = require('../models/Contact');

// Submit contact form
exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, userType, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: 'Please fill in all required fields' });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Please provide a valid email address' });
        }

        // Create contact record
        const contact = new Contact({
            name,
            email,
            userType: userType || 'candidate',
            subject,
            message,
            status: 'pending',
            createdAt: new Date()
        });

        await contact.save();

        // TODO: In production, send email notification to support team
        // You can integrate nodemailer here to send emails

        res.status(200).json({
            message: 'Thank you for contacting us! We\'ll get back to you within 24-48 hours.',
            contactId: contact._id
        });
    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// Get all contact submissions (admin only)
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update contact status (admin only)
exports.updateContactStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const contact = await Contact.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Status updated successfully', contact });
    } catch (error) {
        console.error('Error updating contact status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
