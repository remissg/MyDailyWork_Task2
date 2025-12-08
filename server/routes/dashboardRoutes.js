const {
    getEmployerStats,
    getCandidateStats,
    getEmployerJobs,
    getEmployerApplications,
    getCandidateApplied,
    getCandidateSaved
} = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/auth');

const express = require('express');
const router = express.Router();

router.get('/employer', protect, authorize('employer', 'admin'), getEmployerStats);
router.get('/employer/jobs', protect, authorize('employer', 'admin'), getEmployerJobs);
router.get('/employer/applications', protect, authorize('employer', 'admin'), getEmployerApplications);

router.get('/candidate', protect, authorize('candidate'), getCandidateStats);
router.get('/candidate/applied', protect, authorize('candidate'), getCandidateApplied);
router.get('/candidate/saved', protect, authorize('candidate'), getCandidateSaved);

module.exports = router;
