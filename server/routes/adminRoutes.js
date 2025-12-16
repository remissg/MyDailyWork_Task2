const express = require('express');
const { getSystemStats, getAllUsers, deleteUser, getAllJobs, getAllApplications } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getSystemStats);
router.get('/users', getAllUsers);
router.get('/jobs', getAllJobs);
router.get('/applications', getAllApplications);
router.delete('/users/:id', deleteUser);

module.exports = router;
