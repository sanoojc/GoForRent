import adminModel from '../Model/adminModel.js'
import  jwt  from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import userModel from '../Model/userModel.js'

var salt=bcrypt.genSaltSync(10)

export async function login(req,res){
    try{
        const {email,password}=req.body
        const admin=await adminModel.findOne({email})
        if(admin){
            if(!bcrypt.compareSync(password, admin.password)){
                return res.json({ error: true,login:false, message: "wrong Password" })
            }
            if(admin.role==='admin'){
                const token=jwt.sign({id:admin._id,},'myjwtsecretkey')
                res.cookie('adminToken',token,
                { 
                    httpOnly:true,
                    secure:true,
                    maxAge:1000 * 60 * 60 * 24 * 7 * 30,
                    sameSite:"none"
                }).json({error:false,login:true})
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
        const token = req.cookies.adminToken;
        // if (!token)
        //     return res.json({ login: false, error: true, message: "no token" });

        const verifiedJWT = jwt.verify(token, process.env.jwt_key)
        console.log(verifiedJWT,"jwt");
        const admin = await adminModel.findById(verifiedJWT.id, { password: 0 });
        if (!admin) {
            return res.json({ login: false });
        }
        return res.json({ admin, login: true });
    } catch (err) {
        console.log(err)
        res.json({ login: false, error: err });
    }
}
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
