import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import userRouter from './Routes/userRouter.js'
import connectDB from './Config/dbConnect.js'
import adminRouter from './Routes/adminRouter.js'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import path from 'path'
const app=express()
app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser());
app.use(express.static(path.resolve() + "/public"))
app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true
}))
connectDB()

app.use('/',userRouter)
app.use('/admin',adminRouter)
app.listen(8000,()=>{
    console.log('server connected')
})