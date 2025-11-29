import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company name is required']
    },
    position: {
        type: String,
        required: [true, 'Job Position is required'],
        maxlength: 100,
    },
    status: {
        type: String,
        enum: ['interview', 'reject', 'pending'],
        default: 'pending'
    },
    workType: {
        type:String,
        enum: ['full-time', 'part-time', 'remote', 'internship'],
        default: 'full-time'
    },
    workLocation: {
        type: String,
        default: 'India',
        required: [true, 'Work Location is Required']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
},{ timestamps: true });

export default mongoose.model('Job', jobsSchema);