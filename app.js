import express from "express"
import path from "path"

import cors from "cors"

import {configDotenv} from "dotenv"

import { fileURLToPath } from "url"
import connectDB from "./src/config/db.connect.js"
import acitvityRouter from "./src/routes/activity.routes.js"
import registerRouter from "./src/routes/auth.routes.js"
import bookingRouter from "./src/routes/booking.routes.js"

import {authMiddleware} from "./src/middlewares/auth.middleware.js"

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)





const port=process.env.PORT || 5000
configDotenv()


const app=express()

// app.use(cors)
app.use(express.json())

connectDB().then(()=>{
    console.log("connection successfull")
}).catch((err)=>{console.log("some error occurred while connected db",err.message)})



app.use("/api/v1/events",acitvityRouter)
app.use("/api/v1/register",registerRouter)
app.use("/api/v1/bookings",authMiddleware,bookingRouter)



app.listen(port,()=>{
    console.log(`listening to port ${port}`)
})