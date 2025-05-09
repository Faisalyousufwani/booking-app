import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"password must be 8 characters long"],
    }
})

userSchema.pre("save",async function(next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,10)
    next()
    
})
userSchema.methods.comparePassword=async function(userPassword){
    return  bcrypt.compare(userPassword,this.password)
}
userSchema.methods.generateJwt=function(){
    return jwt.sign({
        id:this._id,name:this.name},
        process.env.JWT_secret,{expiresIn:"1h"}
    )
}
const User=mongoose.model("User",userSchema)
export default User