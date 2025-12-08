const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema(
    {
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Job',
        },
        candidateId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        resumeURL: {
            type: String,
            required: [true, 'Please upload a resume'],
        },
        coverLetter: {
            type: String,
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected', 'interview'], // Added 'accepted' as per implicit spec (status usually has accepted)
            default: 'pending',
        },
        appliedAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate applications
applicationSchema.index({ jobId: 1, candidateId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
