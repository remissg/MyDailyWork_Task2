import mongoose from "mongoose";
import colors from 'colors';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MongoDB Database: ${mongoose.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error}`.bgRed.white);
    }
}

export default connectDB;