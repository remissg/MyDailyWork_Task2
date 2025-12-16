const express = require('express');
const {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(getJobs)
    .post(protect, authorize('employer'), createJob);

router.route('/:id')
    .get(getJob)
    .put(protect, authorize('employer'), updateJob)
    .delete(protect, authorize('employer', 'admin'), deleteJob);

module.exports = router;
