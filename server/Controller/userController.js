import jwt from 'jsonwebtoken'
import userModel from '../Model/userModel.js'
import bcrypt from 'bcryptjs'
// import { mobileOTP } from '../otp.js'
import otpGenerator from 'otp-generator'
import sentOTP from '../nodemailer.js'

let Otp;
let userDetails;
export async function login(req,res){
    try{
        const{email,password}=req.body
        const user=await userModel.findOne({email})
        if(user){
            if(user.ban){
                return res.json({error:true,message:"your account has been suspended"})
            }
            if( bcrypt.compareSync(password, user.password)){
                const token=jwt.sign({id:user._id},process.env.jwt_key)
                res.cookie("userToken",token,
                {
                    httpOnly:true,
                    secure:true,
                    maxAge:1000 * 60 * 60 * 24 * 7 * 30,
                    sameSite:"none"
                }).json({error:false,login:true,user:user._id})
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
    userDetails=req.body
    return res.json({error:false,message:'success'})
}
export async function validateUser(req,res){
    try {
        const token = req.cookies.userToken;
        if (!token)
            return res.json({ login: false, error: true, message: "no token" });

        const verifiedJWT = jwt.verify(token, process.env.jwt_key);
        const user = await userModel.findById(verifiedJWT.id, { password: 0 });
        if (!user) {
            return res.json({ login: false });
        }
        return res.json({ user, login: true });
    } catch (err) {
        console.log(err)
        res.json({ login: false, error: err });
    }
}
export async function resendOtp(req,res){
  try{
    const {email}=req.body
    console.log(req.body) 
    const otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    Otp=otp
    console.log(otp)
    sentOTP(email,otp)
    return res.json({error:false,message:'success'})
  }catch(err){
    console.log(err)
  }



}
export async function verifyOtp(req,res){
  console.log('hiiiiiii')
    const{name,email,number,password}=userDetails
    console.log(userDetails)
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

export async function googleAuth (req , res) {
    try {
     
      if (req.body.access_token) {
        // fetching user details  from google
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${req.body.access_token}`).then( async (response)=> {
          // checking user exist or not
          const user = await user.findOne({ googleId : response.data.id , loginWithGoogle: true } , {password : 0 }).catch((err)=> {
            res.status(500).json({created : false , message : "internal server error "})
  
          });
  
          if(user) {
  // check the user is banned or not 
            if(user.status) {
              
              const token = createToken(user._id);
              res.status(200).json({created:true , user , token , message:"Login Success " })
            }else {
              res.status(200).json({ user ,  message : "Sorry you are banned..!"})
            }
          
  
          }else {
            // if user not exist creating new account 
  
            const newUser = await user.create({
              googleId : response.data.id,
              firstName: response.data.given_name,
              lastName : response.data.family_name,
              email:response.data.email,
              loginWithGoogle:true ,
              picture : response.data.picture ,
              password : response.data.id,
  
            })
  
            // create token after creating 
            const token = createToken(newUser._id)
            res.status(200).json({created:true , user: newUser , token , message : "Signup Success"})
          }
  
        })
      }else{
        res.status(401).json({massage:"Not authorized"})
      }
    } catch (error) {
      res.json({ login: false, message: "Internal Serverl Error" });
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