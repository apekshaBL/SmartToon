import {Schema,model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema=new Schema({
    username:{
        type:String,
        required:[true,"Please enter the name of your kid"],
        minLength:[5,"name should be min 5 letters"],
        maxLength:[50,"name should be of max 50 letters"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter valid email address"
        ]
    },
    password:{
        type:String,
        required:[true,"Please enter the password"],
        trim:true,
        select:false
    },
    age:{
        type:Number,
        required:[true,"Please enter the age of your kid"],
        min:0,
        max:11
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    },
    studyYear:{
        type:String,
        required:[true,"Please enter study year of your student"],
        enum:["KG1","KG2","1ST","2ND","3RD","4TH","5TH"],
    },
    progress: [
        {
          bookId: { 
            type: Schema.Types.ObjectId,
            ref:"Book"
        },
          chapter: { 
            type: String 
        }, // Chapter name or number
          page: { 
            type: Number 
        }, // Current page number
          completed: { 
            type: Boolean, 
            default: false 
        },
    },
      ],
      avatar:{
        public_id:{
            type:String
        },
        secure_url:{
            type:String
        }
    },
    forgotPasswordExpiry:{
        type:Date
    },
},{
    timestamps:true
});

userSchema.methods.generateJWTToken = function() {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_SECRET_KEY_EXPIRY,
        }
    );
};
userSchema.methods.comparePassword = async function (plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password);
};

userSchema.methods.generatePasswordResetToken=async function (){
    const resetToken=crypto.randomBytes(20).toString('hex');
    this.forgotPasswordToken=crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
    this.forgotPasswordExpiry=Date.now()+15*60*1000;
    return resetToken;
}
const User=model('User',userSchema);

export default User;