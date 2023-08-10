import jwt from 'jsonwebtoken'

export async function login(req,res){
    try{
        const{email,password}=req.body
        const user=await userModel.findOne({email})
        if(user){
            if( password===user.password){
                const token=jwt.sign({id:user._id},"myjwtsecretkey")

                res.cookie("userToken",token,
                {
                    httpOnly:true,
                    secure:true,
                    maxAge:1000 * 60 * 60 * 24 * 7 * 30,
                    sameSite:"none"
                }).json({error:false,user:user._id})
            }else{
                res.json({error:true,message:"incorrcet password"})
            }
        }else{
            res.json({error:true,message:"you have not registered.please sign up"})
        }
    }catch(err){
        console.log(err)
    }
}
export async function logout(req,res){
    try{
        res.cookie("userToken","",{
            http:true,
            secure:true,
            expires:new Date(0),
            sameSite:"none"
        }).json({error:false,message:'logged out successfully'})
    }catch(err){
        console.log(err)
    }
}