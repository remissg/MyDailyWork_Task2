import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
    const { name, email, password } = req.body;
    // // validation //
    if(!name){
        next("Name is required");
    }
    if(!email){
        next("Email is required");
    }
    if(!password){
        next("Password is required and must be at least 6 characters long");
    }
    const existingUser = await userModel.findOne({email});
    if(existingUser){
        next("Email Already Registered Please Login");
    }
    const newUser = await userModel.create({name, email, password});
    // token
    const token = newUser.createJWT();
    res.status(201).send({
        success: true,
        message: "User created successfully",
        newUser:{
            name: newUser.name,
            lastName: newUser.lastName,
            email: newUser.email,
            location: newUser.location, 
        },
        token,
    });
};


export const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    // // validation //
    if(!email || !password){
        next("Please Provide Email and Password");
    }
    // find user by email
    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        next("Invalid Username or Password");
    }
    // compare password
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        next("Invalid Username or Password");
    }
    user.password = undefined; // hide password
    const token = user.createJWT();
    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user,
        token,
    })
};