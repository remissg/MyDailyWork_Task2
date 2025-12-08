const User = require('../models/User');
const Job = require('../models/Job');

// @desc    Get all companies (employers)
// @route   GET /api/companies
// @access  Public
const getCompanies = async (req, res) => {
    try {
        // Find all users with role 'employer'
        // You might want to filter by those who have active jobs or profile completed
        const companies = await User.find({ role: 'employer' })
            .select('companyName email createdAt')
            .lean();

        // Optional: Get active job count for each company
        // This is efficient enough for small datasets, but for large ones, aggregation is better
        const companiesWithStats = await Promise.all(companies.map(async (company) => {
            const jobCount = await Job.countDocuments({ employerId: company._id, isActive: true });
            return {
                ...company,
                activeJobs: jobCount
            };
        }));

        res.status(200).json({
            success: true,
            count: companiesWithStats.length,
            data: companiesWithStats
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single company profile
// @route   GET /api/companies/:id
// @access  Public
const getCompanyById = async (req, res) => {
    try {
        const company = await User.findById(req.params.id).select('-password');

        if (!company || company.role !== 'employer') {
            res.status(404);
            throw new Error('Company not found');
        }

        const jobs = await Job.find({ employerId: company._id, isActive: true });

        res.status(200).json({
            success: true,
            data: {
                ...company.toObject(),
                jobs
            }
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    getCompanies,
    getCompanyById
};
