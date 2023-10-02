import chatModel from "../Model/chatModel.js";

export async function createChat(req,res){
    try{
        const newChat= new chatModel({
            members:[req.body.senderId,req.body.reciverId]
        })
        await newChat.save()
        return res.json({error:false,message:'sucess',newChat})

    }catch(err){
        console.log(err)
    }
}
export async function userChats(req,res){
    try{
       const chat= await chatModel.find({members:{$in:[req.params.userId,]}}).lean() 
        return res.json({eror:false,message:'sucess',chat})
    }catch(err){
        console.log(err)
    }
}
export async function findChat(req,res){
    try{
        const chat= await chatModel.findOne({members:{$all:[req.params.firstId,req.params.secondId]}})
        return res.json({eror:false,message:'sucess',chat})
    }catch(err){
        console.log(err)
    }
}