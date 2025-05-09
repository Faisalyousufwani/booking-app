import express from "express"

import activitiesModel from "../models/activities.model.js"
const router= express()
router.get("/",async(req,res)=>{
    const allActivites=await activitiesModel.find()
    res.status(200).json({
        data:allActivites,
        message:"all activites"
    })
})

export default router