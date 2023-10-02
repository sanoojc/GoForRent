import mongoose from "mongoose";
const bookingSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true
    },
    userName:{
        type:String,
        require:true
    },
    vehicle:{
        type:Object,
        require:true
    },
    fromDate:{
        type:Date,
        require:true
    },
    toDate:{
        type:Date,
        require:true
    },
    noOfDays:{
        type:Number,
        require:true
    },
    totalAmount:{
        type:Number,
        require:true
    },paymentDetails:{
        type:Object,
        default:null
    }, 
    paymentStatus:{
        type:String,
        enum:['Paid','Cancelled','Completed']
    },dispatch:{
        type:Date,
        default: new Date(new Date().setDate(new Date().getDate()))
    }
})
const bookingModel=mongoose.model('booking',bookingSchema)
export default bookingModel