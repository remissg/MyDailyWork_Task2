const express = require('express');
const {
    applyToJob,
    getJobApplications,
    getMyApplications,
    getApplicationById,
    updateApplicationStatus
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');
const multer = require('multer');

// Configure multer for basic disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Ensure this directory exists or create it
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ dest: 'uploads/' }); // Simple temp storage

const router = express.Router();

router.post('/:jobId', protect, authorize('candidate'), upload.single('resume'), applyToJob);
router.get('/job/:jobId', protect, authorize('employer', 'admin'), getJobApplications);
router.get('/me', protect, authorize('candidate'), getMyApplications);
router.get('/:id', protect, getApplicationById);
router.put('/:id/status', protect, authorize('employer', 'admin'), updateApplicationStatus);

module.exports = router;
