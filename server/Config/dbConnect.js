import mongoose from 'mongoose'
export default function connectDB(){
    mongoose.set('strictQuery',false)
    mongoose.connect(process.env.DB_CONFIG).then(()=>console.log('DB connected')).catch((err)=>console.log(err))
}