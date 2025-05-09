import express from "express"
import User from "../models/user.model.js"
const router= express()

router.get("/",(req,res)=>{
    res.send("welcome")
})
router.post("/signup",async(req,res)=>{
    const {name,password,email,phone}=req.body
    try{
        const user=await User.findOne({email})
        if(user){
            return res.status(200).json({
                message:"user already exists"
            })
        }
        const newUser= new User({email,password,name,phone})
        await newUser.save()
        const token=newUser.generateJwt()
        // res.cookie('token',token,{
        //     httpOnly:true,
        //     secure:false,
        //     sameSite:'strict',
        //     maxAge:3600000//1 hr
        // })
       res.status(200).json({
        message:"sucessfull signup",
        success:true,
        tok:token
       })
    }
    catch(err){
        res.status(500).json({
            message:"something went wrong",
            error:err.message
        })
    }
})

router.post("/login",async(req,res)=>{
    const {password,email}=req.body
    try {
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"invalid credentils"
            })
        }
        const isMatch= await user.comparePassword(password)
        if(!isMatch){
            return res.status(400).json({
                message:"invalid credentils"
            })
        }
        const token=user.generateJwt()

        // res.cookie('token',token,{
        //     httpOnly:true,
        //     secure:false,
        //     sameSite:'strict',
        //     maxAge:3600000//1 hr
        // })
        
       res.status(200).json({
        message:"login successfull",
        tok:token
       })
    } 
    catch (err) {
        res.status(500).json({
            message:"something went wrong",
            error:err.message
        })
    }

})
router.get("/logout",(req,res)=>{
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,       // required if the cookie was set with secure: true
        sameSite: 'Strict', // match this to how it was set
      });
    
      res.status(200).json({ message: 'Logged out successfully' });

})
export default router