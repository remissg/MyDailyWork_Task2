const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/User');
const Job = require('./models/Job');
const Application = require('./models/Application');
const SavedJob = require('./models/SavedJob');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

const seedCandidate = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB.');

        // 1. Create Candidate User
        console.log('Creating candidate user...');
        const candidateEmail = 'candidate@test.com';

        // Remove if exists
        await User.findOneAndDelete({ email: candidateEmail });
        await Application.deleteMany({}); // Clear apps for clean slate if needed, or filter by user
        await SavedJob.deleteMany({});

        const candidate = await User.create({
            name: 'John Candidate',
            email: candidateEmail,
            password: 'password123',
            role: 'candidate'
        });
        console.log(`Candidate created: ${candidate.email}`);

        // 2. Get some jobs
        const jobs = await Job.find({}).limit(5);
        if (jobs.length < 3) {
            console.log('Not enough jobs to seed applications. Run seed.js first.');
            process.exit(1);
        }

        // 3. Create Applications
        console.log('Creating applications...');
        await Application.create([
            {
                candidateId: candidate._id,
                jobId: jobs[0]._id,
                status: 'pending',
                resumeURL: 'https://example.com/resume.pdf'
            },
            {
                candidateId: candidate._id,
                jobId: jobs[1]._id,
                status: 'interview',
                resumeURL: 'https://example.com/resume.pdf'
            }
        ]);
        console.log('Applications created.');

        // 4. Create Saved Jobs
        console.log('Creating saved jobs...');
        await SavedJob.create([
            {
                candidateId: candidate._id,
                jobId: jobs[2]._id
            },
            {
                candidateId: candidate._id,
                jobId: jobs[3]._id
            }
        ]);
        console.log('Saved jobs created.');

        console.log('\n=== CANDIDATE SEED SUMMARY ===');
        console.log(`Email: ${candidateEmail}`);
        console.log(`Password: password123`);
        console.log('==============================\n');

        process.exit(0);

    } catch (error) {
        console.error('Error seeding candidate:', error);
        process.exit(1);
    }
};

seedCandidate();
