const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/User');
const Job = require('./models/Job');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

const users = [
    {
        name: 'Tech Corp Recruiter',
        email: 'employer@example.com',
        password: 'password123',
        role: 'employer',
        companyName: 'TechCorp Inc.'
    },
    {
        name: 'Startup Founder',
        email: 'founder@startup.com',
        password: 'password123',
        role: 'employer',
        companyName: 'NextGen Startups'
    },
    {
        name: 'Global HR',
        email: 'hr@global.com',
        password: 'password123',
        role: 'employer',
        companyName: 'Global Solutions'
    },
    {
        name: 'Design Studio Lead',
        email: 'lead@design-studio.com',
        password: 'password123',
        role: 'employer',
        companyName: 'Pixel Perfect'
    },
    {
        name: 'Cloud Systems Admin',
        email: 'admin@cloud.com',
        password: 'password123',
        role: 'employer',
        companyName: 'Cloud Systems'
    },
    // Admin User
    {
        name: 'System Admin',
        email: 'admin@jobportal.com',
        password: 'password123',
        role: 'admin'
    }
];

const jobs = [
    // TechCorp Jobs
    {
        title: 'Senior Full Stack Developer',
        description: 'We are seeking an experienced Full Stack Developer to join our dynamic engineering team. You will work on cutting-edge technologies and build scalable web applications.',
        requirements: '5+ years of experience, React & Node.js, MongoDB or PostgreSQL, RESTful API design, Git & CI/CD',
        salaryRange: '$100,000 - $140,000',
        location: 'San Francisco, CA',
        experience: '5+ years',
        jobType: 'Full-time',
        category: 'Engineering',
        isActive: true
    },
    {
        title: 'Frontend Developer',
        description: 'Join our frontend team to create beautiful, responsive user interfaces. Experience with modern JavaScript frameworks required.',
        requirements: '3+ years of experience, React or Vue.js, HTML5, CSS3, JavaScript, Responsive design, UI/UX principles',
        salaryRange: '$80,000 - $110,000',
        location: 'Remote',
        experience: '3+ years',
        jobType: 'Full-time',
        category: 'Engineering',
        isActive: true
    },
    // NextGen Startups Jobs
    {
        title: 'Product Designer',
        description: 'We need a creative product designer to shape the user experience of our new mobile app.',
        requirements: 'Portfolio demonstrating strong UI/UX skills. Proficiency in Figma and prototyping tools.',
        salaryRange: '$90k - $120k',
        location: 'San Francisco, CA',
        experience: '2-4 years',
        jobType: 'Contract',
        category: 'Design',
        isActive: true
    },
    {
        title: 'Growth Marketing Manager',
        description: 'Lead our user acquisition strategies and growth experiments.',
        requirements: 'Proven track record in digital marketing, SEO, and paid ads.',
        salaryRange: '$100k - $130k',
        location: 'Remote',
        experience: '3-5 years',
        jobType: 'Full-time',
        category: 'Marketing',
        isActive: true
    },
    // Global Solutions Jobs
    {
        title: 'DevOps Engineer',
        description: 'Manage our cloud infrastructure and CI/CD pipelines.',
        requirements: 'Experience with AWS, Terraform, and Jenkins.',
        salaryRange: '$130k - $160k',
        location: 'Austin, TX',
        experience: '4+ years',
        jobType: 'Full-time',
        category: 'Development',
        isActive: true
    },
    {
        title: 'Data Scientist',
        description: 'Analyze large datasets to derive actionable insights.',
        requirements: 'Strong background in Python, SQL, and machine learning libraries.',
        salaryRange: '$125k - $155k',
        location: 'Boston, MA',
        experience: '3+ years',
        jobType: 'Full-time',
        category: 'Data Science',
        isActive: true
    },
    // Pixel Perfect Jobs
    {
        title: 'UX Researcher',
        description: 'Conduct user research to inform design decisions.',
        requirements: 'Experience with qualitative and quantitative research methods.',
        salaryRange: '$85k - $115k',
        location: 'Remote',
        experience: '2+ years',
        jobType: 'Part-time',
        category: 'Design',
        isActive: true
    },
    // Cloud Systems Jobs
    {
        title: 'Cybersecurity Analyst',
        description: 'Protect our systems from security threats and vulnerabilities.',
        requirements: 'Knowledge of network security, ethical hacking, and compliance standards.',
        salaryRange: '$115k - $145k',
        location: 'Washington, D.C.',
        experience: '3-5 years',
        jobType: 'Full-time',
        category: 'IT',
        isActive: true
    }
];

const seedDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        // Clear existing data
        console.log('Clearing existing data...');
        await User.deleteMany({});
        await Job.deleteMany({});

        // Create Users
        console.log('Creating users...');
        const createdUsers = [];
        for (const user of users) {
            // The User model's pre-save hook will handle password hashing.
            // We just need to pass the user object with the plain-text password.
            const newUser = await User.create(user);
            createdUsers.push(newUser);
        }
        console.log('Users Created');

        // Distribute jobs among employers
        const employers = createdUsers.filter(u => u.role === 'employer');

        const jobDocs = jobs.map((job, index) => {
            const employer = employers[index % employers.length];
            return {
                ...job,
                employerId: employer._id,
                company: employer.companyName
            };
        });

        await Job.insertMany(jobDocs);
        console.log('Jobs Created');

        console.log('Seeding Completed');
        process.exit();
    } catch (error) {
        console.error('Seed Error:', error.message);
        if (error.errors) {
            Object.keys(error.errors).forEach(key => {
                console.error(`Field: ${key}, Error: ${error.errors[key].message}`);
            });
        }
        process.exit(1);
    }
};

seedDB();
