import express from 'express';
import { addDetails, addProof, bookingDates, changePassword, editProfile, fetchBookingData, fetchUserData, filterElements, forgotPassword, getHub, getVehicles, googleAuth, login, logout, paymentVerification, refund, resendOtp, setNewPassword, signup, validateUser, verifyMailOtp, verifyOtp } from '../Controller/userController.js';
import verifyUser from '../Middlewares/verifyUser.js';

const router=express.Router();
router.post('/login',login)
router.post('/signup',signup)
router.post('/verifyOtp/:otp',verifyOtp)
router.post('/verifyMail',verifyMailOtp)
router.get('/check-auth',validateUser)
router.post('/logout',logout)
router.post('/resendOtp',resendOtp)
router.post('/vehicle',getVehicles)
router.post('/google-auth',googleAuth)
router.route('/filter').get(filterElements)
router.get('/getHub',getHub)
router.route('/forgotPassword').post(forgotPassword)
router.route('/changePassword').patch(setNewPassword)
router.get('/bookingDates/:id',bookingDates)

router.use(verifyUser)
router.patch('/refund',refund)
router.route('/password').patch(changePassword)
router.get('/getUser/:id',fetchUserData)
router.put('/user',editProfile)
router.post('/proof',addProof)
router.route('/checkout').post(addDetails)
router.route('/verifyPayment').post(paymentVerification)
router.route('/bookingDetails').get(fetchBookingData)



export default router    
