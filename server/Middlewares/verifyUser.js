import jwt from 'jsonwebtoken'
import userModel from '../Model/userModel.js'

const verifyUser=async(req,res,next)=>{
    try{
        console.log('userrrrrrr')
        const token=req.cookies.userToken
        if(!token){
            return res.json({error:true,login:false,message:'no token found'})
        }
        const verifiedJWT=jwt.verify(token,process.env.jwt_key)
        const user=await userModel.findById(verifiedJWT.id,{password:0})
        if(!user){
            return res.json({error:true,login:false,message:'user not found'})
        }
        req.user=user
        next()
    }catch(err){
        console.log(err)
    }
}
export default verifyUser