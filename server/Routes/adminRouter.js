import express from 'express'
import { addCategory, addHub, banUser, changeBookingStatus, deleteHub, editHub, fetchCategory, fetchDashboardData, findCategory, getBookings, getHub, getUsers, listHub, login, validateAdmin } from '../Controller/adminController.js'
import { addVehicle, editVehicle, getVehicle, listVehicle } from '../Controller/vehicleController.js'
import verifyAdmin from '../Middlewares/verifyAdmin.js'


const router=express.Router()
router.post('/login',login)
router.get('/check-auth',validateAdmin)
router.use(verifyAdmin)
router.get('/users',getUsers)
router.patch('/ban/:id',banUser) 
router.route('/vehicles').get(getVehicle).post(addVehicle).put(editVehicle).patch(listVehicle)
router.route('/hubs').get(getHub).post(addHub).put(editHub).patch(listHub).delete(deleteHub)
router.route('/category').get(fetchCategory).post(addCategory)
router.route('/viewCategory').get(findCategory)
router.route('/bookings').get(getBookings).patch(changeBookingStatus)
router.route('/dashboard').get(fetchDashboardData)


export default router