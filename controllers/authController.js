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