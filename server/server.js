import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import userRouter from './Routes/userRouter.js'
import chatRouter from './Routes/chatRouter.js'
import messageRouter from'./Routes/messageRouter.js'
import connectDB from './Config/dbConnect.js'
import adminRouter from './Routes/adminRouter.js'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import http from 'http'
import path from 'path'
import {Server} from 'socket.io'
import socketConnect from './Config/socketConnect.js'
const app=express()
const server=http.createServer(app)
const io=new Server(server,{
    cors: {
        origin: [process.env.BASE_URL]
      },
})
let activeUsers={}
socketConnect(io, activeUsers)

app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser());
app.use(express.static(path.resolve() + "/public"))
app.use(cors({
    origin:[process.env.BASE_URL],
    credentials:true
}))
connectDB()

app.use('/admin',adminRouter)
app.use('/chat',chatRouter)
app.use('/message',messageRouter)
app.use('/',userRouter)
server.listen(8000,()=>{
    console.log('server connected')
})