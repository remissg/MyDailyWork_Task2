import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";
// CREATE JOB CONTROLLER    // 
export const createJobController = async (req, res, next) => {
    const {company, position} = req.body;

    // // validation   //
    if(!company || !position){
        return next('Please Provide All Fields');
    }
    req.body.createdBy = req.user.userId;
    const job = await jobsModel.create(req.body);
    res.status(201).json({ job });
};

// GET JOBS CONTROLLER  //
export const getAllJobsController = async (req, res, next) => {
    
    // const jobs = await jobsModel.find({createdBy: req.user.userId})
    res.status(200).json({
        totalJobs : jobs.length,
        jobs,
    })
};

// UPDATE JOB CONTROLLER  //
export const updateJobController = async (req, res, next) => {
    const{id} = req.params;
    const {company, position} = req.body;
    // // Validation   //
    if(!company || !position){
        return next("Please Provide All Fields");
    }
    // Find Jobs
    const job = await jobsModel.findOne({_id:id})
    // validation
    if(!job){
        return next(`No jobs found with this id ${id}`);
    }
    // permissions check
    if(!req.user.userId === job.createdBy.toString()){
        return next("You are not authorized to update this job");
    }
    const updateJob = await jobsModel.findOneAndUpdate({_id:id}, req.body, {
        new: true,
        runValidators: true,
    });
    // res
    res.status(200).json({updateJob});
};

// DELETE JOB CONTROLLER  //
export const deleteJobController = async (req, res, next) => {
    const {id} = req.params;
    // Find Job
    const job = await jobsModel.findOne({_id:id})
    // validation
    if(!job){
        return next(`No jobs found with this id ${id}`);
    }
    // permissions check
    if(!req.user.userId === job.createdBy.toString()){
        return next("You are not authorised to delete this job");
    }
    await job.deleteOne();
    // res
    res.status(200).json({message: "Job Deleted Successfully"}); 
}

// JOBS STATS CONTROLLER  //
export const jobStatsController = async (req, res) => {
    const stats = await jobsModel.aggregate([
        //  search by user jobs
        {
            $match: { 
                createdBy: new mongoose.Types.ObjectId(req.user.userId) 
            },
        },
        {
            $group: {
                _id: "$status",
                count: {$sum: 1},
            },
        },
    ]);

    // default stats object
    const defaultStats = {
        pending: stats.pending || 0,
        reject: stats.reject || 0,
        interview: stats.interview || 0,
    };

    // monthly / yearly applications stats
    let monthlyApplication = await jobsModel.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId),
            },
        },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                count: { $sum: 1 },
            },
        },
    ]);

    monthlyApplication = monthlyApplication.map(item => {
        const { _id: { year, month }, count } = item;
        const date = moment().month(month - 1).year(year).format("MMM Y");
        return { date, count }; 
    })
    .reverse();

    res.status(200).json({ totalJobs: stats.length, defaultStats, monthlyApplication });
};