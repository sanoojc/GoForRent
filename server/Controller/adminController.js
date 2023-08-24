import adminModel from '../Model/adminModel.js'
import  jwt  from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
var salt=bcrypt.genSaltSync(10)

export async function login(req,res){
    try{
        const {email,password}=req.body
        const admin=await adminModel.find({email})
        if(admin){
            const validAdmin=bcrypt.compareSync(password,admin.password)
            if(!validAdmin){
                return res.json({ err: true, message: "wrong Password" })
            }
            if(admin.role==='admin'){
                const token=jwt.sign({id:admin._id,},'myjwtsecretkey')
                res.cookie('adminToken',token,
                { 
                    httpOnly:true,
                    secure:true,
                    maxAge:1000 * 60 * 60 * 24 * 7 * 30,
                    sameSite:"none"
                }).json({error:false,user:user._id})
            }
        }
    }catch(err){
        console.log(err)
    }
}
