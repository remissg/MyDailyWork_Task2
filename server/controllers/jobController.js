const Job = require('../models/Job');
const User = require('../models/User');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
    try {
        const { keyword, category, location, jobType, salaryRange, limit, sort } = req.query;
        let query = { isActive: true };

        if (keyword) {
            query.title = { $regex: keyword, $options: 'i' };
        }
        if (category && category !== 'All Categories') {
            query.category = category;
        }
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }
        if (jobType) {
            query.jobType = jobType;
        }
        if (salaryRange) {
            // Basic regex search for salary range string match (for MVP)
            query.salaryRange = { $regex: salaryRange, $options: 'i' };
        }

        // Sorting Logic
        let sortOption = { createdAt: -1 }; // Default new to old

        if (sort) {
            switch (sort) {
                case 'newest':
                    sortOption = { createdAt: -1 };
                    break;
                case 'oldest':
                    sortOption = { createdAt: 1 };
                    break;
                case 'salaryHigh':
                    sortOption = { maxSalary: -1 };
                    break;
                case 'salaryLow':
                    sortOption = { minSalary: 1 };
                    break;
                default:
                    sortOption = { createdAt: -1 };
            }
        }

        let jobQuery = Job.find(query).sort(sortOption);

        if (limit) {
            jobQuery = jobQuery.limit(parseInt(limit));
        }

        const jobs = await jobQuery;

        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
const getJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('employerId', 'name email companyName');

        if (!job) {
            res.status(404);
            throw new Error('Job not found');
        }

        res.status(200).json({
            success: true,
            data: job
        });
    } catch (error) {
        res.status(404).json({ message: 'Job not found' });
    }
};

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private (Employer)
const createJob = async (req, res) => {
    try {
        const job = await Job.create({
            employerId: req.user.id,
            company: req.user.companyName || req.body.company,
            ...req.body
        });

        res.status(201).json({
            success: true,
            data: job
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Employer)
const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            res.status(404);
            throw new Error('Job not found');
        }

        // Check user ownership
        if (job.employerId.toString() !== req.user.id && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('User not authorized');
        }

        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: updatedJob
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Employer)
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            res.status(404);
            throw new Error('Job not found');
        }

        // Check user ownership
        if (job.employerId.toString() !== req.user.id && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('User not authorized');
        }

        await job.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
};
