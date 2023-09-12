import  jwt  from "jsonwebtoken";

const verifyAdmin=async (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.json({error:true,login:false,message:'no token found'})
        }
        const verifiedJWT=jwt.verify(token,process.env.jwt_key)
        if(verifiedJWT){
            next()
        }else{
            return res.json({error:true,message:'authorisation failed'})
        }
    }catch(err){
        console.log(err)
    }
}
export default verifyAdmin 