import express from 'express';
import { addDetails, bookingDates, changePassword, editProfile, fetchBookingData, fetchUserData, filterElements, getHub, getVehicles, googleAuth, login, logout, paymentVerification, refund, resendOtp, signup, validateUser, verifyOtp } from '../Controller/userController.js';
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
router.route('/filter').get(filterElements)
router.get('/getHub',getHub)

router.use(verifyUser)
router.patch('/refund',refund)
router.route('/password').patch(changePassword)
router.get('/getUser/:id',fetchUserData)
router.put('/user',editProfile)
router.get('/bookingDates/:id',bookingDates)
router.route('/checkout').post(addDetails)
router.route('/verifyPayment').post(paymentVerification)
router.route('/bookingDetails').get(fetchBookingData)



export default router    
