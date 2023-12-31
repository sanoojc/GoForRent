import express from 'express'
import { addCategory, addCategoryItem, addHub, banUser, changeBookingStatus, editHub, fetchCategory, fetchDashboardData, findCategory, getBookings, getHub, getUsers, listHub, login, salesReport, validateAdmin } from '../Controller/adminController.js'
import { addVehicle, editVehicle, getVehicle, listVehicle } from '../Controller/vehicleController.js'
import verifyAdmin from '../Middlewares/verifyAdmin.js'


const router=express.Router()
router.post('/login',login)
router.get('/check-auth',validateAdmin)
router.get('/report',salesReport)
router.use(verifyAdmin)
router.get('/users',getUsers)
router.patch('/ban/:id',banUser) 
router.route('/vehicles').get(getVehicle).post(addVehicle).put(editVehicle).patch(listVehicle)
router.route('/hubs').get(getHub).post(addHub).put(editHub).patch(listHub)
router.route('/category').get(fetchCategory).post(addCategory)
router.route('/viewCategory').get(findCategory)
router.route('/bookings').get(getBookings).patch(changeBookingStatus)
router.route('/dashboard').get(fetchDashboardData)
router.route('/categoryItem').get(addCategoryItem)
  

export default router