import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    googleId : {
        type : String ,
        allowNull : true
      },
  
      loginWithGoogle : {
        type : Boolean ,
        default : false 
      },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    number:{
        type:Number,
        require:true
    },
    profile:{
        type:Object,
        default:'avathar1.png'
    },
    address:{
        type:Object
    },
    license:{
        type:Object
    },
    idCard:{
        type:Object
    },
    ban:{
        type:Boolean,
        default:false
    }
})
const userModel=mongoose.model('user',userSchema)
export default userModel