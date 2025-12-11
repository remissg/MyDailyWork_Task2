const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

// Public route
router.post('/', contactController.submitContactForm);

// Admin routes
router.get('/', protect, authorize('admin'), contactController.getAllContacts);
router.put('/:id', protect, authorize('admin'), contactController.updateContactStatus);

module.exports = router;
