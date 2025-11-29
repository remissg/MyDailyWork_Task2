// Pakages imports
import express from 'express';
import expressAsyncErrors from 'express-async-errors';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';
// Files imports
import connectDB from './config/db.js';
// routes imports
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import jobsRoutes from './routes/jobsRoutes.js';
import userRoutes from './routes/userRoutes.js';

// config dotenv
dotenv.config();

// mongoDB connection
connectDB();

// rest object
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/jobs', jobsRoutes);


// Validation Middleware
app.use(errorMiddleware);

// port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(`Node Server Running In ${process.env.DEV_MODE} Mode On Port no ${PORT}`.bgCyan.white);
});