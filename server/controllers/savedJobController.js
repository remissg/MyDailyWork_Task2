const SavedJob = require('../models/SavedJob');
const Job = require('../models/Job');

// @desc    Save a job
// @route   POST /api/save/:jobId
// @access  Private (Candidate)
const saveJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            res.status(404);
            throw new Error('Job not found');
        }

        // Check if already saved
        const alreadySaved = await SavedJob.findOne({
            candidateId: req.user.id,
            jobId: jobId
        });

        if (alreadySaved) {
            res.status(400);
            throw new Error('Job already saved');
        }

        await SavedJob.create({
            candidateId: req.user.id,
            jobId: jobId
        });

        res.status(201).json({ success: true, message: 'Job saved successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Unsave a job
// @route   DELETE /api/save/:jobId
// @access  Private (Candidate)
const unsaveJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;

        const savedJob = await SavedJob.findOne({
            candidateId: req.user.id,
            jobId: jobId
        });

        if (!savedJob) {
            res.status(404);
            throw new Error('Saved job not found');
        }

        await savedJob.deleteOne();

        res.status(200).json({ success: true, message: 'Job removed from saved list' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get my saved jobs
// @route   GET /api/save/my
// @access  Private (Candidate)
const getMySavedJobs = async (req, res) => {
    try {
        const savedJobs = await SavedJob.find({ candidateId: req.user.id })
            .populate({
                path: 'jobId',
                select: 'title company location jobType salaryRange experience',
                populate: { path: 'employerId', select: 'companyName' }
            });

        res.status(200).json({
            success: true,
            count: savedJobs.length,
            data: savedJobs
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    saveJob,
    unsaveJob,
    getMySavedJobs
};
