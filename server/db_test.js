const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars from current directory (.env is in server/)
dotenv.config({ path: path.join(__dirname, '.env') });

const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        console.log(`URI: ${process.env.MONGO_URI ? 'Found' : 'Missing'}`);

        await mongoose.connect(process.env.MONGO_URI);

        console.log('SUCCESS: Connected to MongoDB.');
        process.exit(0);
    } catch (error) {
        console.error('FAILURE: Could not connect to MongoDB.');
        console.error('Error:', error.message);
        process.exit(1);
    }
};

connectDB();
