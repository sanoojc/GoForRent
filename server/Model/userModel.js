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
        default:'https://res.cloudinary.com/dik9ovj3j/image/upload/v1697007343/lj3kdkapkcdf0sxbsewo.png'
    },
    address:{
        type:Object
    },
    licenseNumber:{
        type:String
    },
    licenseImage:{
        type:String
    },
    idType:{
        type:String
    },
    idNumber:{
        type:Number
    },
    idImage:{
        type:String
    },
    bookings:{
        type:Array
    },
    ban:{
        type:Boolean,
        default:false
    },
    wallet:{
        type:Number,
        default:0
    }
})
const userModel=mongoose.model('user',userSchema)
export default userModel