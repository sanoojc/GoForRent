import mongoose from "mongoose";
const adminSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        default:"admin"
    },
    hub:{
        type:String,
        default:'all'
    }
})
const adminModel=mongoose.model('admin',adminSchema)
export default adminModel