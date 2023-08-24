import express from 'express';
import { login, signup, verifyOtp } from '../Controller/userController.js';
import verifyUser from '../Middlewares/verifyUser.js';

const router=express.Router();
router.post('/',login)
router.post('/signup',signup)
router.post('/sentOtp/:otp',verifyOtp)

router.use(verifyUser)



export default router    
