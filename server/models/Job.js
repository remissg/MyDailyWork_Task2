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
        minSalary: {
            type: Number,
        },
        maxSalary: {
            type: Number,
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

// Pre-save hook to parse salaryRange into minSalary and maxSalary
jobSchema.pre('save', function (next) {
    if (this.salaryRange) {
        // Example: "$100k - $140k" or "$80,000 - $110,000"
        const numbers = this.salaryRange.match(/(\d+)[kK]?/g);

        if (numbers && numbers.length > 0) {
            const parseSalary = (str) => {
                let num = parseInt(str.replace(/\D/g, ''));
                if (str.toLowerCase().includes('k')) {
                    num *= 1000;
                }
                return num;
            };

            this.minSalary = parseSalary(numbers[0]);

            if (numbers.length > 1) {
                this.maxSalary = parseSalary(numbers[1]);
            } else {
                this.maxSalary = this.minSalary;
            }
        }
    }
    next();
});

module.exports = mongoose.model('Job', jobSchema);
