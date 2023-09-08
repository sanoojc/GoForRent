import express from 'express'
import { addHub, banUser, deleteHub, editHub, getHub, getUsers, login, validateAdmin } from '../Controller/adminController.js'
import { addVehicle, getVehicle, listVehicle } from '../Controller/vehicleController.js'
import verifyAdmin from '../Middlewares/verifyAdmin.js'


const router=express.Router()
router.post('/login',login)
router.get('/check-auth',validateAdmin)
router.use(verifyAdmin)
router.get('/users',getUsers)
router.patch('/ban/:id',banUser) 
router.route('/vehicles').get(getVehicle).post(addVehicle).patch(listVehicle)
router.route('/hubs').get(getHub).post(addHub).patch(editHub).delete(deleteHub)

export default router