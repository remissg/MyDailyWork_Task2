const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
    {
        employerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: [true, 'Please add a job title'],
        },
        company: {
            type: String,
            required: [true, 'Please add a company name'],
        },
        description: {
            type: String,
            required: [true, 'Please add a job description'],
        },
        requirements: {
            type: [String],
            default: [],
        },
        experience: {
            type: String,
            required: [true, 'Please add experience level'],
        },
        jobType: {
            type: String,
            required: [true, 'Please add a job type (Full-time, Part-time, etc)'],
        },
        salaryRange: {
            type: String,
            required: [true, 'Please add a salary range'],
        },
        location: {
            type: String,
            required: [true, 'Please add a location'],
        },
        category: {
            type: String,
            required: [true, 'Please add a category'],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Job', jobSchema);
