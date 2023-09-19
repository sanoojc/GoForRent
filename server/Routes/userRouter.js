import express from 'express';
import { addDetails, getVehicles, googleAuth, login, logout, paymentVerification, resendOtp, signup, validateUser, verifyOtp } from '../Controller/userController.js';
import verifyUser from '../Middlewares/verifyUser.js';

const router=express.Router();
router.post('/login',login)
router.post('/signup',signup)
router.post('/verifyOtp/:otp',verifyOtp)
router.get('/check-auth',validateUser)
router.post('/logout',logout)
router.post('/resendOtp',resendOtp)
router.get('/vehicle',getVehicles)
router.post('/google-auth',googleAuth)

router.use(verifyUser)
router.route('/checkout').post(addDetails)
router.route('/verifyPayment').post(paymentVerification)



export default router    
