const Job = require('../models/Job');
const Application = require('../models/Application');
// SavedJob model likely needed for getCandidateSaved if used directly, but usually we just import it if needed.
// However, dashboard routes seem to use simple queries.
// Let's ensure we use the correct models.

// @desc    Get Employer Stats
// @route   GET /api/dashboard/employer
// @access  Private (Employer)
const getEmployerStats = async (req, res) => {
    try {
        const jobs = await Job.find({ employerId: req.user.id });
        const jobIds = jobs.map(job => job._id);

        const applicationCount = await Application.countDocuments({ jobId: { $in: jobIds } });

        res.status(200).json({
            success: true,
            data: {
                totalJobs: jobs.length,
                activeJobs: jobs.filter(j => j.isActive).length,
                totalApplications: applicationCount
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Candidate Stats
// @route   GET /api/dashboard/candidate
// @access  Private (Candidate)
const getCandidateStats = async (req, res) => {
    try {
        const applicationCount = await Application.countDocuments({ candidateId: req.user.id });

        // Count saved jobs
        const SavedJob = require('../models/SavedJob');
        const savedJobsCount = await SavedJob.countDocuments({ candidateId: req.user.id });

        res.status(200).json({
            success: true,
            data: {
                appliedJobs: applicationCount,
                savedJobs: savedJobsCount
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Employer Jobs
// @route   GET /dashboard/employer/jobs
// @access  Private (Employer)
const getEmployerJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ employerId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: jobs.length, data: jobs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Employer Applications (All)
// @route   GET /dashboard/employer/applications
// @access  Private (Employer)
const getEmployerApplications = async (req, res) => {
    try {
        const jobs = await Job.find({ employerId: req.user.id });
        const jobIds = jobs.map(job => job._id);

        const applications = await Application.find({ jobId: { $in: jobIds } })
            .populate('jobId', 'title')
            .populate('candidateId', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: applications.length, data: applications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Candidate Applied Jobs
// @route   GET /dashboard/candidate/applied
// @access  Private (Candidate)
const getCandidateApplied = async (req, res) => {
    try {
        const applications = await Application.find({ candidateId: req.user.id })
            .populate({
                path: 'jobId',
                populate: { path: 'employerId', select: 'companyName' }
            });

        res.status(200).json({ success: true, count: applications.length, data: applications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Candidate Saved Jobs
// @route   GET /dashboard/candidate/saved
// @access  Private (Candidate)
const getCandidateSaved = async (req, res) => {
    try {
        const SavedJob = require('../models/SavedJob');
        const savedJobs = await SavedJob.find({ candidateId: req.user.id })
            .populate({
                path: 'jobId',
                populate: { path: 'employerId', select: 'companyName' }
            });

        res.status(200).json({ success: true, count: savedJobs.length, data: savedJobs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getEmployerStats,
    getCandidateStats,
    getEmployerJobs,
    getEmployerApplications,
    getCandidateApplied,
    getCandidateSaved
};
