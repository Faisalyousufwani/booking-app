
import mongoose from "mongoose"

const activitySchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    activity:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Activity"
    }],
    createdAt:{
        type:Date,
        default:Date.now()
    }  
}
)
const Booking= mongoose.model("Booking",activitySchema)
export default Booking