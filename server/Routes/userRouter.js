import express from 'express';
import { getVehicles, googleAuth, login, logout, resendOtp, signup, validateUser, verifyOtp } from '../Controller/userController.js';

const router=express.Router();
router.post('/login',login)
router.post('/signup',signup)
router.post('/verifyOtp/:otp',verifyOtp)
router.get('/check-auth',validateUser)
router.post('/logout',logout)
router.post('/resendOtp',resendOtp)
router.get('/vehicle',getVehicles)
router.post('/google-auth',googleAuth)

// router.use(verifyUser)



export default router    
