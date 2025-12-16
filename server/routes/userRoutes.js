const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const multer = require('multer');
const User = require('../models/User');
const { uploadToCloudinary, validateFile, deleteFromCloudinary } = require('../utils/fileUpload');

// Multer configuration for in-memory storage
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// @desc    Upload new resume version
// @route   POST /api/users/resume
// @access  Private (Candidate)
router.post('/resume', protect, authorize('candidate'), upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload a file' });
        }

        // Validate file
        validateFile(req.file);

        // Upload to Cloudinary
        const uploadResult = await uploadToCloudinary(req.file.buffer, {
            folder: 'job-portal/resumes',
            public_id: `resume_${req.user.id}_${Date.now()}`,
            resource_type: 'raw'
        });

        const user = await User.findById(req.user.id);

        // If this is the first resume, make it default
        const isDefault = user.resumes.length === 0;

        const newResume = {
            url: uploadResult.secure_url,
            cloudinaryId: uploadResult.public_id,
            name: req.file.originalname,
            isDefault,
            uploadedAt: Date.now()
        };

        user.resumes.push(newResume);

        // Update legacy fields for backward compatibility if it's the default
        if (isDefault) {
            user.resumeURL = newResume.url;
            user.resumeCloudinaryId = newResume.cloudinaryId;
        }

        await user.save();

        res.status(200).json({
            success: true,
            data: user.resumes
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// @desc    Get all user resumes
// @route   GET /api/users/resume
// @access  Private (Candidate)
router.get('/resume', protect, authorize('candidate'), async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('resumes resumeURL resumeCloudinaryId');

        // If user has legacy resume but empty resumes array, migrate it
        if (user.resumeURL && user.resumes.length === 0) {
            user.resumes.push({
                url: user.resumeURL,
                cloudinaryId: user.resumeCloudinaryId || 'legacy',
                name: 'Main Resume',
                isDefault: true
            });
            await user.save();
        }

        res.status(200).json({
            success: true,
            data: user.resumes
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// @desc    Set default resume
// @route   PUT /api/users/resume/:resumeId/default
// @access  Private (Candidate)
router.put('/resume/:resumeId/default', protect, authorize('candidate'), async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const resumeId = req.params.resumeId;

        const resumeExists = user.resumes.id(resumeId);
        if (!resumeExists) {
            return res.status(404).json({ success: false, message: 'Resume not found' });
        }

        // Reset all to not default
        user.resumes.forEach(r => r.isDefault = false);

        // Set new default
        resumeExists.isDefault = true;

        // Update legacy fields
        user.resumeURL = resumeExists.url;
        user.resumeCloudinaryId = resumeExists.cloudinaryId;

        await user.save();

        res.status(200).json({
            success: true,
            data: user.resumes
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// @desc    Delete specific resume
// @route   DELETE /api/users/resume/:resumeId
// @access  Private (Candidate)
router.delete('/resume/:resumeId', protect, authorize('candidate'), async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const resume = user.resumes.id(req.params.resumeId);

        if (!resume) {
            return res.status(404).json({ success: false, message: 'Resume not found' });
        }

        // Delete from Cloudinary
        if (resume.cloudinaryId && resume.cloudinaryId !== 'legacy') {
            await deleteFromCloudinary(resume.cloudinaryId);
        }

        // Remove from array
        user.resumes.pull(req.params.resumeId);

        // If deleted resume was default, set another one as default if exists
        if (resume.isDefault && user.resumes.length > 0) {
            user.resumes[0].isDefault = true;
            user.resumeURL = user.resumes[0].url;
            user.resumeCloudinaryId = user.resumes[0].cloudinaryId;
        } else if (user.resumes.length === 0) {
            user.resumeURL = undefined;
            user.resumeCloudinaryId = undefined;
        }

        await user.save();

        res.status(200).json({
            success: true,
            data: user.resumes
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;
