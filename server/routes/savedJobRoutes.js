const express = require('express');
const {
    saveJob,
    unsaveJob,
    getMySavedJobs
} = require('../controllers/savedJobController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/:jobId', protect, authorize('candidate'), saveJob);
router.delete('/:jobId', protect, authorize('candidate'), unsaveJob);
router.get('/my', protect, authorize('candidate'), getMySavedJobs);

module.exports = router;
