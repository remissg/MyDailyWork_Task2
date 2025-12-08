const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Apply to a job
// @route   POST /api/applications/:jobId
// @access  Private (Candidate)
const applyToJob = async (req, res) => {
    try {
        const { coverLetter } = req.body;
        const jobIdParam = req.params.jobId;

        // Check if job exists
        const job = await Job.findById(jobIdParam);
        if (!job) {
            res.status(404);
            throw new Error('Job not found');
        }

        // Check if already applied
        const alreadyApplied = await Application.findOne({
            jobId: jobIdParam, // mapping param to field
            candidateId: req.user.id
        });

        if (alreadyApplied) {
            res.status(400);
            throw new Error('You have already applied to this job');
        }

        // Mock Resume Upload
        const resumeURL = req.file ? req.file.path : 'https://example.com/resume-placeholder.pdf';

        const application = await Application.create({
            jobId: jobIdParam,
            candidateId: req.user.id,
            resumeURL,
            coverLetter
        });

        res.status(201).json({
            success: true,
            data: application
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get applications for a specific job
// @route   GET /api/applications/job/:jobId
// @access  Private (Employer)
const getJobApplications = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);

        if (!job) {
            res.status(404);
            throw new Error('Job not found');
        }

        // Check ownership
        if (job.employerId.toString() !== req.user.id && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('Not authorized to view applications for this job');
        }

        const applications = await Application.find({ jobId: req.params.jobId })
            .populate('candidateId', 'name email');

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get my applications (Candidate)
// @route   GET /api/applications/me
// @access  Private (Candidate)
const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ candidateId: req.user.id })
            .populate({
                path: 'jobId',
                select: 'title company location jobType'
            });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get single application by ID
// @route   GET /api/applications/:id
// @access  Private (Employer/candidate)
const getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate('jobId', 'title company location jobType')
            .populate('candidateId', 'name email');

        if (!application) {
            res.status(404);
            throw new Error('Application not found');
        }

        // Check permissions (Employer who owns the job OR Candidate who owns the application OR Admin)
        const job = await Job.findById(application.jobId);
        const isEmployer = job && job.employerId.toString() === req.user.id;
        const isCandidate = application.candidateId._id.toString() === req.user.id;
        const isAdmin = req.user.role === 'admin';

        if (!isEmployer && !isCandidate && !isAdmin) {
            res.status(401);
            throw new Error('Not authorized to view this application');
        }

        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private (Employer)
const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        // Validate status
        if (!['pending', 'accepted', 'rejected', 'interview'].includes(status)) {
            res.status(400);
            throw new Error('Invalid status');
        }

        const application = await Application.findById(req.params.id);

        if (!application) {
            res.status(404);
            throw new Error('Application not found');
        }

        // Check ownership via Job
        const job = await Job.findById(application.jobId);
        if (!job) {
            res.status(404); // Should technically not happen if app exists
            throw new Error('Job not found');
        }

        if (job.employerId.toString() !== req.user.id && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('Not authorized to update this application');
        }

        application.status = status;
        await application.save();

        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    applyToJob,
    getJobApplications,
    getMyApplications,
    getApplicationById,
    updateApplicationStatus
};
