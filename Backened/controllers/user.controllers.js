import User from "../models/user.models.js";
import AppError from "../utils/error.utils.js";
import sendEmail from "../utils/sendEmail.js";
import { validate } from "email-validator";
import cloudinary from "cloudinary";
import fs from 'fs/promises';
import crypto from "crypto";
import bcryptjs from "bcryptjs";

const cookieOptions={
    httpOnly:true,
    maxAge: 7 * 24 * 60 * 60 * 1000,//7 days
    secure:true,
}

//signup/register function

const register=async(req,res,next)=>{
    const{username,email,password,age ,studyYear}=req.body;
    console.log(username,email,password,age ,studyYear);
    try{
      if(!username || !password ||!email || !age || !studyYear){
        return next(new AppError("All fields are required",400));
      }
      if(!validate(email)){
        return next(new AppError("Enter a valid Email",400));
      }
      const userExists=await User.findOne({email});
      if(userExists){
        return next(new AppError("Email already exits",400));
      }

      const user=await User.create({
        username,
        email,
        password,
        age,
        studyYear,
        avatar:{
            public_id: email,
            secure_url:'https://i.pinimg.com/236x/da/6b/a9/da6ba988037661d18a5a2a28d8a4e5cc.jpg'
        }
    });

      if(!user){
        return next(new AppError("Registration failed, please try again", 400));
      }
      console.log(user);

      //File upload
        console.log("File details are", JSON.stringify(req.file));
        if (req.file) {
            try{
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'lms',
                    width: 250,
                    height: 250,
                    gravity: 'faces',
                    crop: 'fill'
            })
            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                // Remove file from server
                await fs.rm(`uploads/${req.file.filename}`);
        }
        }
        catch(error){
            return next(new AppError(error.message || 'File not uploaded, please try again', 500));
        }
    }
 // Save all data
        await user.save();

        // Undefined password so don't show it
        user.password = undefined;

        const token = user.generateJWTToken();
        res.cookie('token', token, cookieOptions);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
};


//login function
const login=async(req,res,next)=>{
    const {email,password}=req.body;
    console.log(email,password);
    try{
        if(!email || !password){
            return next(new AppError("All fields are required",400));
        }
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return next(new AppError("Incorrect email or password", 400));
        }
 // Undefined password so don't show it
        user.password = undefined;
        const token = await user.generateJWTToken();
        res.cookie('token', token, cookieOptions);

        res.status(200).json({
            success: true,
            message: "User logged in successfully!",
            user,
        });
            } catch (error) {
            return next(new AppError(error.message, 400));
        }
};


//logout function
const logout=async(req,res,next)=>{
    res.cookie('token', null, {
        secure: true,
        maxAge: 0,
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "User logged out successfully!"
    });
};

//get profile function
const getProfile=async(req,res,next)=>{
    try{
        const userId = req.user.id;
        const user = await User.findById(userId);

        res.status(200).json({
            success: true,
            message: "User details",
            user
        });
    }
    catch(error){
 return next(new AppError("Failed to fetch profile", 400));
    }
}

//forgot password
const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        if (!email) {
            return next(new AppError("Please provide your email address", 400));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return next(new AppError("User not registered", 400));
        }

        const resetToken = await user.generatePasswordResetToken();
        await user.save();
        const resetPasswordURL = `${process.env.FE_URL}/reset-password/${resetToken}`;
        console.log(resetPasswordURL);
        const subject = 'Reset Password';
        const message = `You can reset your password by clicking <a href="${resetPasswordURL}">here</a>.`;

        try {
            await sendEmail(email, subject, message);
            res.status(200).json({
                success: true,
                message: `Password reset link sent to your email ${email}`
            });
        } catch (error) {
            user.forgotPasswordExpiry = undefined;
            user.forgotPasswordToken = undefined;
            await user.save();
            return next(new AppError(error.message, 500));
        }
    } catch (error) {
        return next(new AppError("Failed to reset the password", 400));
    }
}

// Reset password function
const resetPassword = async (req, res, next) => {
    const { resetToken } = req.params;
    const { password } = req.body;
    const forgotPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry: { $gt: Date.now() }
    });

    if (!user) {
        return next(new AppError('Token is invalid or expired, please try again', 400));
    }

    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Password changed successfully!'
    });
}

const changePassword=async (req,res,next)=>{
    const {oldPassword , newPassword}=req.body
    const {id}=req.user
    console.log("password and new password",oldPassword , newPassword)
    console.log(req.user)
    try {
        if(!oldPassword || !newPassword){
            return next(errorhandler(401,"All the fields are required"))
        }

        const user=await User.findById(id).select('+password')

        if(!user){
            return next(errorhandler(404,"User not found"))
        }

        const isPasswordCorrect=await bcryptjs.compare(oldPassword,user.password)

        if(!isPasswordCorrect){
            return next(errorhandler(401,"Incorrect password"))
        }

        const hashedPassword=await bcryptjs.hash(newPassword,10)

        user.password=hashedPassword
        user.save()

        return res.status(201).json({
            success:true,
            message:"Password is changed successfully"
        })
    } catch (error) {
        console.log("failed to change password")
        console.log(error.message)
        return res.status(500).json({
            success:false,
            message:error.message ||"failed to change password"
        })
    }
}

// Update function
const update = async (req, res, next) => {
    const { username } = req.body;
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return next(new AppError('User does not exist', 400));
        }

        if (username) {
            user.username = username;
        }

        if (req.file) {
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);

            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'lms',
                    width: 250,
                    height: 250,
                    gravity: 'faces',
                    crop: 'fill'
                });

                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                // Remove file from server
                await fs.rm(`uploads/${req.file.filename}`);
            } catch (error) {
                return next(new AppError(error.message || 'File not uploaded, please try again', 400));
            }
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully"
        });
    } catch (error) {
        return next(new AppError(error.message || 'Something went wrong', 400));
    }
}

export { 
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    update
};