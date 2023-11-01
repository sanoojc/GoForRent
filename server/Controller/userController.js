import jwt from 'jsonwebtoken'
import userModel from '../Model/userModel.js'
import bcrypt from 'bcryptjs'
// import { mobileOTP } from '../otp.js'
import otpGenerator from 'otp-generator'
import sentOTP from '../nodemailer.js'
import vehicleModel from '../Model/vehicleModel.js'
import axios from 'axios'
import instance from '../helper/razorpay.js'
import crypto from 'crypto'
import bookingModel from '../Model/bookingModel.js'
import categoryModel from '../Model/categoryModel.js'
import hubModel from '../Model/hubModel.js'
import adminModel from '../Model/adminModel.js'
let Otp;
let userDetails;

export async function login(req, res) {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (user) {
      if (user.ban) {
        return res.json({ error: true, message: "your account has been suspended" })
      }
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user._id }, process.env.jwt_key)
        user.password = ''
        const bookings=await bookingModel.find({userId:user._id}).lean()
        if(bookings){
          return res.json({ error: false, login: true, user: user, token ,bookings })
        }
        res.json({ error: false, login: true, user: user, token})
      } else {
        res.json({ error: true, message: "incorrcet password" })
      }
    } else {
      res.json({ error: true, message: "you have not registered.please sign up" })
    }
  } catch (err) {
    return res.json({ error: true, message: 'internal server error' })
  }
}
export async function forgotPassword(req,res){
  try{
    const {email}=req.body
    const user=await userModel.findOne({email:email})
    if(!user){
      return res.json({error:true,message:'No user found !'})
    }
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    sentOTP(email,otp)
    Otp = otp
    return res.json({ error: false, message: 'success' })
  }catch(error){
    res.json({ error, error: true, message: "Something went wrong" });           
  }

}

export async function signup(req, res) {
  const { name, email, number, password, confirmPassword } = req.body
  const user = await userModel.findOne({ email })
  if (user) {
    return res.json({ error: true, message: 'User already exists' })
  }
  if (name.trim() == '' || email.trim() == '' || number.trim() == '' || password.trim() == '' || confirmPassword.trim() == '') {
    return res.json({ error: true, message: 'please fill all fields' })
  }
  if (password !== confirmPassword) {
    return res.json({ error: true, message: 'password does not match' })
  }
  const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
  // // mobileOTP(number,otp)
  sentOTP(email, otp)
  Otp = otp
  userDetails = req.body
  return res.json({ error: false, message: 'success' })
}
export async function validateUser(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token){
      return res.json({ login: false, error: true, message: "no token" });
    }
    const verifiedJWT = jwt.verify(token, process.env.jwt_key);
    if(!verifiedJWT){
      return res.json({error:true,message:'Jwt verificatioin failed'})
    }
    const user = await userModel.findById(verifiedJWT.id, { password: 0 });
    if (!user) {
      return res.json({ login: false });
    }
    return res.json({ user, login: true });
  } catch (err) {
    res.json({ login: false, error: err });
  }
}
export async function resendOtp(req, res) {
  try {
    const { email } = req.body
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    Otp = otp
    console.log(otp)
    sentOTP(email, otp)
    return res.json({ error: false, message: 'success' })
  } catch (err) {
    return res.json({ error: true, message: 'internal server error' })
  }
}
export async function verifyOtp(req, res) {
  const { name, email, number, password } = userDetails
  const otp = req.params.otp
  if (Otp == otp) {
    Otp = null
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new userModel({ name, email, number, password: hashedPassword })
    newUser.save()
    return res.json({ error: false, message: 'success' })
  } else {
    return res.json({ error: true, message: 'incorrect otp' })
  }
}
export async function verifyMailOtp(req, res) {
  try{
    const {otp} = req.body
    if(!Otp){
      return res.json({error:true,message:'Something went wrong'})
    }
    if (Otp == otp) {
      Otp=''
      return res.json({error:false,message:'Success'})
    } else {
      return res.json({ error: true, message: 'incorrect otp' })
    }
  }catch(err){
    return res.json({ error: true, message: 'Something went wrong' })

  }
}
export async function googleAuth(req, res) {
  try {
    if (req.body.access_token) {
      // fetching user details  from google
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${req.body.access_token}`).then(async (response) => {
        // checking user exist or not
        const user = await userModel.findOne({ email: response.data.email }, { password: 0 }).catch((err) => {
          res.status(500).json({ created: false, message: "internal server error " })
        });
        if (user) {
          // check the user is banned or not 
          if (!user.block) {
            const token = jwt.sign({ id: user._id }, process.env.jwt_key)
            res.status(200).json({ error: false, user, login: true, token, message: "Login Success " })
          } else {
            res.status(200).json({ error: true, user, login: true, message: "Sorry you are banned..!" })
          }
        } else {
          // if user not exist creating new account 
          const newUser = await userModel.create({
            googleId: response.data.id,
            name: response.data.given_name,
            email: response.data.email,
            loginWithGoogle: true,
            profile: response.data.picture,
            password: response.data.id,

          })
          // create token after creating 
          const token = jwt.sign({ id: user._id }, process.env.jwt_key)
          res.status(200).json({ created: true, login: true, user: newUser, token: token, message: "Signup Success" })
        }
      })
    } else {
      res.status(401).json({ massage: "Not authorized" })
    }
  } catch (error) {
    res.json({ login: false, message: "Internal Serverl Error" });
  }
}

export async function addProof(req,res){
  try{

    const{licenseNumber,licenseFrontUrl,licenseBackUrl,idType,idNumber,idFrontUrl,idBackUrl}=req.body
    const token = req.headers.authorization.split(' ')[1];
    if (!token)
    return res.json({ login: false, error: true, message: "No token" });
  
  const verifiedJWT = jwt.verify(token, process.env.jwt_key);
  const user = await userModel.findById(verifiedJWT.id, { password: 0 });
  if (!user) {
    return res.json({ login: false });
  }
  if(licenseNumber.trim()==''|| idType.trim()==''|| !idNumber){
    return res.json({error:true,message:'Fill all the fields'})
  }
  if(licenseFrontUrl.trim()=='' || licenseBackUrl.trim()=='' || idFrontUrl.trim()=='' || idBackUrl.trim()==''){
    return res.json({error:true,message:'Upload all images'})
  }
  if(!user.licenseImage.length || !user.idImage.length){
    user.licenseNumber=licenseNumber
    user.licenseImage.push(licenseFrontUrl,licenseBackUrl)
    user.idType=idType
    user.idNumber=idNumber
    user.idImage.push(idFrontUrl,idBackUrl)
    await user.save()
    return res.json({error:false,message:'Success'})
  }
  else{
    user.licenseNumber=licenseNumber
    user.licenseImage.splice(0,user.licenseImage.length)
    user.idImage.splice(0,user.idImage.length)
    user.licenseImage.push(licenseFrontUrl,licenseBackUrl)
    user.idType=idType
    user.idNumber=idNumber
    user.idImage.push(idFrontUrl,idBackUrl)
    await user.save()
    return res.json({error:false,message:'Success'})
  }
  }catch(error){
    return res.json({error:true,message:'something went wrong'})
  }





}
export async function fetchUserData(req,res){
  try{
    const {id}=req.params
    const admin=await adminModel.findOne({_id:id})
    if(admin){
      return res.json({error:false,message:'sucess',admin})
    }
    return res.json({error:true,message:'no user found'})
  }catch(err){
    return res.json({ error: true, message: 'internal server error' })
    }
}
export async function editProfile (req,res){
  try{
    const{id,name,profileUrl}=req.body
    if(profileUrl){
      const user=await userModel.findByIdAndUpdate(id,{$set:{name,profile:profileUrl}})
      res.json({error:false,message:'success',user})
    }else{
      const user=await userModel.findByIdAndUpdate(id,{$set:{name}})
      res.json({error:false,message:'success',user})

    }
  }catch(err){
    return res.json({ error: true, message: 'internal server error' })
  }
  
  
}
export async function changePassword(req,res){
  try{
    const{id,currentPassword,newPassword,confirmPassword}=req.body
    const user=await userModel.findById(id)
    if(bcrypt.compareSync(currentPassword,user.password)){
      if(newPassword.trim()===''||confirmPassword.trim()===''){
        return res.json({error:true,message:'Password does not match'})
      }else{
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password=hashedPassword
        await user.save()
        return res.json({error:false,message:'sucess'})
      }
    }else{
      return res.json({error:true,message:'Incorrect password'})
    }
  }catch(err){
    return res.json({error:true,message:"Internal server error"})
  }

}

export async function setNewPassword(req,res){
  try{

    const {email,password,confirmPassword}=req.body
    if(password.length<4 || password.trim()==''){
      return res.json({error:true,message:'Password must be atleast 4 digits'})
    }
    if(password===confirmPassword){
      const hashedPassword = await bcrypt.hash(password, 10)
      const user=await userModel.findOneAndUpdate({email:email},{$set:{
        password:hashedPassword
      }})
      return res.json({error:false,message:'Success'})
    }
    
  }catch(error){
    return res.json({error:true,message:'Internal server error'})
  }
}
export async function logout(req, res) {
  try {
    res.json({ error: false, message: 'logged out successfully' })
  } catch (err) {
    return res.json({ error: true, message: 'internal server error' })
  }
}

export async function getVehicles(req, res) {
  try {
    const name = req.query.name ?? ''
    const page = req.query.page ?? 1
    const count = req.query.count ?? 3
    const sort = req.query.sort ?? ''
    const bodyType=req.body.BodyType??''
    const fuelType=req.body.FuelType??''
    const transmission=req.body.BodyType??''
    const skip = (page - 1) * count
    const hub = req.query.hub ? req.query.hub:'calicut'
      const hubs=await hubModel.find({list:true}).lean()
      const categories=await categoryModel.find().lean()
    if (sort) {
      if (sort === 'name') {
        const vehicle = await vehicleModel.find({$or:[{vehicleName: new RegExp(name, "i")},{brand: new RegExp(name, "i")}],hubId: { $regex: new RegExp(hub, "i") },bodyType: { $regex: new RegExp(bodyType, "i") },fuelType: { $regex: new RegExp(fuelType, "i") },transmission: { $regex: new RegExp(transmission, "i") },list: true})
        .sort({ vehicleName: 1 })
        .limit(count)
        .skip(skip)
        .lean()
        return res.json({ error: false, message: 'success',hubs, vehicles: vehicle,categories })
      } else if (sort === 'Low to High') {
        const vehicle = await vehicleModel.find({$or:[{vehicleName: new RegExp(name, "i")},{brand: new RegExp(name, "i")}],hubId: { $regex: new RegExp(hub, "i") },bodyType: { $regex: new RegExp(bodyType, "i") },fuelType: { $regex: new RegExp(fuelType, "i") },transmission: { $regex: new RegExp(transmission, "i") },list: true})
        .sort({ rent: 1 })
        .limit(count)
        .skip(skip)
        .lean()
        return res.json({ error: false, message: 'success',hubs, vehicles: vehicle,categories })
      } else if (sort === 'High to Low') {
        const vehicle = await vehicleModel.find({$or:[{vehicleName: new RegExp(name, "i")},{brand: new RegExp(name, "i")}],hubId: { $regex: new RegExp(hub, "i") },bodyType: { $regex: new RegExp(bodyType, "i") },fuelType: { $regex: new RegExp(fuelType, "i") },transmission: { $regex: new RegExp(transmission, "i") },list: true})
        .sort({ rent: -1 })
        .limit(count)
        .skip(skip)
        .lean()
        return res.json({ error: false, message: 'success',hubs, vehicles: vehicle,categories })
      }
    } else {
      const vehicle = await vehicleModel.find({$or:[{vehicleName: new RegExp(name, "i")},{brand: new RegExp(name, "i")}],hubId: { $regex: new RegExp(hub, "i") },bodyType: { $regex: new RegExp(bodyType, "i") },fuelType: { $regex: new RegExp(fuelType, "i") },transmission: { $regex: new RegExp(transmission, "i") },list: true})
      .limit(count)
      .skip(skip)
      .lean()
      return res.json({ error: false, message: 'success',hubs, vehicles: vehicle,categories })
    }
  } catch (err) {
    return res.json({ error: true, message: 'internal server error' })
  }
}

export async function fetchBookingData(req,res){
  const {id}=req.query
  const bookings=await bookingModel.find({userId:id}).lean()
  if(bookings){
   return res.json({error:false,message:'sucess',bookings})
  } 
  return res.json({error:true,message:'no bookings found'})
}
//checkout
export async function addDetails(req, res) {
  const { total } = req.body
  const options = {
    amount: total * 100,
    currency: "INR",
  }
  instance.orders.create(options, (err, order) => {
    if (err) {
      return res.json({ error: true, message: 'server error' })
    } else {
      return res.json({ error: false, message: 'Sucess', order })
    }
  })
}
//payment
export async function paymentVerification(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token)
      return res.json({ login: false, error: true, message: "no token" });

    const verifiedJWT = jwt.verify(token, process.env.jwt_key);
    const user = await userModel.findById(verifiedJWT.id, { password: 0 });
    if (!user) {
      return res.json({ login: false });
    }
    const { response} = req.body

    const details=req.body.details??''
    const body = response.razorpay_order_id + "|" + response.razorpay_payment_id;
    const start = new Date(details.vehicleData.checkIn)
    const end = new Date(details.vehicleData.checkOut)
    const timeDifference = end.getTime() - start.getTime()
    const noOfDays=(Math.floor(timeDifference / (1000 * 60 * 60 * 24)))
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_PAY_SECRET_KEY)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === response.razorpay_signature) {

      if(!user.licenseImage.length && !user.idImage.length && !details){
        return res.json({error:true,message:'User ID and license must be uploaded'})
      }
      if (user.licenseImage.includes(null) || user.idImage.includes(null)) {
        return res.json({ error: true, message: 'Reupload the image' });
      }

      if(!user.licenseImage.length || !user.idImage.length){
        if(details.idFrontUrl && details.idBackUrl){
          if(details.idBackUrl==null || details.idFrontUrl==null){
          }else{
            user.idImage.push(details.idFrontUrl,details.idBackUrl)
          }
        }
        if(details.licenseFrontUrl && details.licenseBackUrl){
          if(details.licenseFrontUrl==null || details.licenseBackUrl==null){
          }else{
            user.licenseImage.push(details.licenseFrontUrl,details.licenseBackUrl)
          }
        }
        user.idType=details.idType
        user.idNumber=details.idNumber
        await user.save()              
      }
      const booking = new bookingModel({
        userId:user._id,
        userName:user.name,
        vehicle:details.vehicleData.vehicle,
        fromDate:details.vehicleData.checkIn,
        toDate:details.vehicleData.checkOut,
        noOfDays,
        totalAmount:details.amount,
        paymentDetails:response,
        paymentStatus:'Paid',
      });
      booking.save()
      return res.json({error: false,booking,message:'booking completed'});
    } else {
      return res.json({error: true,message: "payment verification failed",});
    }
  } catch (error) {
    res.json({ error, err: true, message: "Something went wrong" });
  }
}

export async function refund(req,res){
  try{
    const {id}=req.body
    const booking=await bookingModel.findById(id)
    
    const paymentId=booking.paymentDetails.razorpay_payment_id
    const amount=(booking.totalAmount*100)
    const refund=await instance.payments.refund(paymentId,{
      amount: amount,
      speed: "optimum",
      receipt: booking.paymentDetails.razorpay_order_id
    })
    booking.paymentStatus="Cancelled"
    await booking.save()
    res.json({error:false,message:'sucess'})
  }catch(err){
    return res.json({error:true,message:'Internal server error'})
  }
}

//FILTER
export async function filterElements(req,res){
  try{
    const categories=await categoryModel.find().lean()
    return res.json({error:false,message:'sucess',categories:categories})
  }catch(err){
    return res.json({ error: true, message: 'internal server error' })
  }
}
// HUB
export async function getHub(req,res){
  try{
    const hubs=await hubModel.find().lean()
    return res.json({error:false,message:'sucess',hubs})
  }catch(err){
    return res.json({ error: true, message: 'internal server error' })
  }
}

export async function bookingDates (req,res){
  try{
    const {id}=req.params
    const bookings = await bookingModel.find({ 'vehicle._id': id, 'paymentStatus': { $ne: 'Cancelled' } });
    const dates=bookings.map((booking)=>{
      return [booking.fromDate,booking.toDate]
    })
    const allDates=[]
    dates.map((item)=>{
      const from=item[0]
      const to=item[1]
      let currentDate=new Date(from)
      while(currentDate<=to){
        allDates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1); 
      }
    })
    return res.json({error:false,message:'sucess',allDates})
  }catch(err){
    res.json({error:true,message:'Internal server error'})
  }
}