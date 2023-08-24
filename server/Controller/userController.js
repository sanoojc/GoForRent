import jwt from 'jsonwebtoken'
import userModel from '../Model/userModel.js'
import bcrypt from 'bcryptjs'
// import { mobileOTP } from '../otp.js'
import otpGenerator from 'otp-generator'
import sentOTP from '../nodemailer.js'

let Otp;
export async function login(req,res){
    try{
        const{email,password}=req.body
        const user=await userModel.findOne({email})
        if(user){
            const hashedPassword=bcrypt.hash(password,10)
            if( hashedPassword===user.password){
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
export async function signup(req,res){
    const{name,email,number,password,confirmPassword}=req.body
    const user=await userModel.findOne({email})
    if(user){
      return  res.json({error:true,message:'User already exists'})
    }
    if(name.trim()==''||email.trim()==''||number.trim()==''||password.trim()==''||confirmPassword.trim()==''){
        return res.json({error:true,message:'please fill all fields'})
    }
    if(password!==confirmPassword){
        return res.json({error:true,message:'password does not match'})
    }
    const otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    // // mobileOTP(number,otp)
    console.log(otp)
    sentOTP(email,otp)
    Otp=otp
    return res.json({error:false,message:'success'})
}
export async function verifyOtp(req,res){
    const{name,email,number,password}=req.body
    const otp=req.params.otp
    if(Otp==otp){
        Otp=null
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new userModel({name,email,number,password:hashedPassword})
        newUser.save()
        return res.json({error:false,message:'success'})
    }else{
        return res.json({error:true,message:'incorrect otp'})
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