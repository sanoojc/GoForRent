import  jwt  from "jsonwebtoken";
import adminModel from "../Model/adminModel.js";

const verifyAdmin=async (req,res,next)=>{
    try{
        const token=req.cookies.adminToken
        if(!token){
            return res.json({error:true,login:false,message:'no token found'})
        }
        const verifiedJWT=jwt.verify(token,process.env.jwt_key)
        const admin=await adminModel.findById(verifiedJWT.id,{password:0})
        if(!admin){
            return res.json({error:true,login:false,message:"admin not found"})
        }
        req.admin=admin
        next()
    }catch(err){
        console.log(err)
    }
}
export default verifyAdmin