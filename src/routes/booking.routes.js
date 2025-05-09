import express from "express"
import bookingModel from "../models/booking.model.js"

const router = express.Router()
router.post("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user.id
        console.log(userId)
        const result = await bookingModel.findOneAndUpdate({ user: userId }, { $addToSet: { activity: id } }, { upsert: true, new: true }).populate("activity")
        res.status(200).json({
            message: "successfully added",
            data: result

        })
    }
    catch(error){
        res.status(500).json({
            message:"something went wrong"
        })
    }
    
    

    
})
router.get("/",async(req,res)=>{
    const userId=req.user.id
    try {
        const bookings=await bookingModel.find({user:userId}).populate("activity")
        console.log(bookings)
        if(!activities) return res.status(404).json({message:"no activities added"})
        res.json(
            bookings.activity
    )
    } catch (error) {
        res.status(500).json({
            message:"something went wrong"
        })
    }
})

export default router