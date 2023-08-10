import express from 'express'
import { Router } from 'express-router'

const app=express()
app.use(express.json())


app.listen(8000,()=>{
    console.log('server connected')
})