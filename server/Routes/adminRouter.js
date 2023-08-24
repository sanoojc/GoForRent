import express from 'express'
import { login } from '../Controller/adminController.js'
import verifyAdmin from '../Middlewares/verifyAdmin.js'

const router=express.Router()
router.post('/login',login)
router.use(verifyAdmin)

export default router