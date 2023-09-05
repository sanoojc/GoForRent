import express from 'express'
import { banUser, getUsers, login, validateAdmin } from '../Controller/adminController.js'
import { addVehicle, getVehicle, listVehicle } from '../Controller/vehicleController.js'


const router=express.Router()
router.post('/login',login)
router.get('/check-auth',validateAdmin)
router.get('/users',getUsers)
router.patch('/ban/:id',banUser) 
router.route('/vehicles').get(getVehicle).post(addVehicle).patch(listVehicle)

export default router