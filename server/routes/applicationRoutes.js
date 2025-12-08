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

// Serverless filesystem is read-only; use in-memory storage for uploads.
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/:jobId', protect, authorize('candidate'), upload.single('resume'), applyToJob);
router.get('/job/:jobId', protect, authorize('employer', 'admin'), getJobApplications);
router.get('/me', protect, authorize('candidate'), getMyApplications);
router.get('/:id', protect, getApplicationById);
router.put('/:id/status', protect, authorize('employer', 'admin'), updateApplicationStatus);

module.exports = router;
