import mongoose from "mongoose";

const hubSchema=mongoose.Schema({
    hubName:{
        type:String,
        require:true
    },longitude:{
        type:Number,
        requre:true
    },
    latitude:{
        type:Number,
        require:true
    }

})
const hubModel=mongoose.model('hub',hubSchema)
export default hubModel