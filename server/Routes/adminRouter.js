import express from 'express'
import { banUser, getUsers, login, validateAdmin } from '../Controller/adminController.js'
import { addVehicle } from '../Controller/vehicleController.js'


const router=express.Router()
router.post('/login',login)
router.get('/check-auth',validateAdmin)
router.get('/users',getUsers)
router.patch('/ban/:id',banUser) 
router.route('/vehicles').post(addVehicle)

export default router