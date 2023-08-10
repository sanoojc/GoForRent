import mongoose from 'mongoose'
export default function connectDB(){
    mongoose.set('strictQuery',false)
    mongoose.connect(process.env.DB_CONFIG)
    .then((res)=>{
        console.log('connected to database')
    })
    .catch((err)=>{
        console.log(err)
    })
}