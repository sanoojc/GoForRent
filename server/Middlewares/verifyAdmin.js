import  jwt  from "jsonwebtoken";

const verifyAdmin=async (req,res,next)=>{
    try{
        const token=req.cookies.adminToken
        if(!token){
            return res.json({error:true,login:false,message:'no token found'})
        }
        const verifiedJWT=jwt.verify(token,process.env.jwt_key).then((response)=>{
            next()
        }).catch((err)=>{
            return res.json({error:true,message:'authorisation failed'})
        })
    }catch(err){
        console.log(err)
    }
}
export default verifyAdmin