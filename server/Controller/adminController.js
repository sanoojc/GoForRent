import adminModel from '../Model/adminModel.js'
import  jwt  from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import userModel from '../Model/userModel.js'
import hubModel from '../Model/hubModel.js'
import categoryModel from '../Model/categoryModel.js'
import bookingModel from '../Model/bookingModel.js'

var salt=bcrypt.genSaltSync(10)

export async function login(req,res){
    try{
        const {email,password}=req.body
        console.log(req.body)
        const admin=await adminModel.findOne({email})
        if(admin){
            if(!bcrypt.compareSync(password, admin.password)){
                return res.json({ error: true,login:false, message: "wrong Password" })
            }
            if(admin.role==='admin'){
                const token=jwt.sign({id:admin._id,},'myjwtsecretkey')
                admin.password=''
                res.json({error:false,token:token,login:true,admin:admin})
            }
        }else{
            return res.json({ error: true,login:false, message: "admin not found" })
        }
    }catch(err){
        console.log(err)
    }
}
export async function validateAdmin(req,res){
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token){
            return res.json({ login: false, error: true, message: "no token" });
        }
        const verifiedJWT = jwt.verify(token, process.env.jwt_key)
        const admin = await adminModel.findById(verifiedJWT.id, { password: 0 });
        if (!admin) {
            return res.json({error:true, login: false });
        }
        return res.json({error:false, admin, login: true,message:'successfully logged in' });
    } catch (err) {
        console.log(err)
        res.json({ login: false, error: err });
    }
}
//HUB
export async function getHub(req,res){
    try{
        let name=req.query.name
        if(name==null || name=="undefined"){
            name=''
        }
        console.log(name,'name')
        const hub=await hubModel.find({hubName: new RegExp(name, "i") }).lean()
        return res.json({error:false,message:'sucess',hub:hub})
    }catch(err){
        console.log(err)
    }
}
export async function addHub(req,res){
    try{
        const {hubName,longitude,latitude}=req.body
        const hub = await hubModel.findOne({hubName:new RegExp(hubName, "i") })
        if(hub){
            return res.json({error:true,message:'hub already added'})
        }else{
            const newHub= new hubModel({hubName,longitude,latitude})
            newHub.save()
            return res.json({error:false,message:'hub sucessfully added'})
        }
    }catch(err){
        console.log(err)
    }
}
export async function editHub(req,res){
    try{
        const id=req.query.id
        const hub=await hubModel.findByIdAndUpdate({id},{$set:{hubName,longitude,latitude}})
        if(hub){
            return res.json({error:false,message:'updated'})
        }else{
            return res.json({error:true,message:'something went wrong'})
        }
    }catch(err){
        console.log(err)
    }
}
export async function listHub(req,res){
    try{
        const id=req.query.id
        console.log(id,'hub id')
        let hub= await hubModel.findById({_id:id})
        console.log(hub,'hub')
 if(hub){
    if(hub.list){
         hub=await hubModel.findByIdAndUpdate(id,{$set:{list:false}})
         return res.json({error:false,message:'unlisted'})
    }else{
        hub=await hubModel.findByIdAndUpdate(id,{$set:{list:true}})
        return res.json({error:false,message:'unlisted'})
    }
 }else{
    return res.json({error:true,message:'Hub not found'})
 }
    }catch(err){
        console.log(err)
    }
}
export async function deleteHub(req,res){
    try{
        
    }catch(err){
        console.log(err)
    }
}
//USERS
export async function getUsers(req,res){
    try{
        const name=req.query.name??''
        const users=await userModel.find({ name: new RegExp(name, "i") }).lean()
        return res.json({error:false,user:users})
    }catch(err){
        console.log(err)
    }
}
export async function banUser(req,res){
    try{
        const id=req.params.id
        console.log(id)
        let user=await userModel.findById({_id:id})  
        console.log(user)
        if(user){
            if(user.ban){
               user= await userModel.findByIdAndUpdate(id,{$set:{ban:false}})         
                return res.json({error:false,user:user,message:"user unbanned"})
            }else{
               user= await userModel.findByIdAndUpdate(id,{$set:{ban:true}})
                return res.json({error:false,user:user,messsage:'user banned'})
            }
        }else{
            return res.json({error:true,message:'user not found'})
        }
    }catch(err){
        console.log(err)
    }
}
//CATEGORY
export async function fetchCategory(req,res){
    try{
        const categories=await categoryModel.find()
        console.log(categories)
        return res.json({error:false,message:'sucess',categories})
    }catch(err){
        console.log(err)
    }
}
export async function addCategory(req,res){
    const {data}=req.body    
    if(data){
        const category=await categoryModel.findOne({name: new RegExp(data, "i") })
        if(category){
            return res.json({error:true,message:'category already exists'})
        }else{
            const category= new categoryModel({name:data})
            category.save()
            return res.json({error:false,message:'sucess'})
        }
    }
    return res.json({error:true,message:'field is empty'})
}  
export async function findCategory(req,res){
    const name=req.query.name??''
    const category=await categoryModel.findOne({name:new RegExp(name,"i")})
    return res.json({error:false,message:'sucess', category})
}
// BOOKINGS
export async function getBookings(req,res){
    try{
        const name=req.query.name??""
        console.log(name,'booking')
        const bookings =await bookingModel.find().populate('userId').lean()
        res.json({error:false,message:'sucess',bookings})
    }catch(err){
        console.log(err)
    }
}
