import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

// schema object
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    }
    , lastName: {
        type: String,
    }
    , email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    }
    , password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters long'],
        select: true,
    }
    , location: {
        type: String,
        default: 'India'
    }
}, 
{ timestamps: true }
);
// middleware for password hashing
userSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// JSON WEBTOKEN 
userSchema.methods.createJWT = function(){
    return JWT.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn: '1d'}); 
}

export default mongoose.model('User', userSchema);