import messageModel from "../Model/messageModel.js";

export async function addMessage(req,res){
    try{
        const {chatId,senderId,text}=req.body
        const message=new messageModel({
            chatId,
            senderId,
            text
        })
       await  message.save()
        return res.json({error:false,message:'sucess',messages:message})
    }catch(err){
        return res.json({ error: true, message: 'internal server error' })
    }
}
export async function getMessages(req,res){
    try{
        const {chatId}=req.params
        const messages=await messageModel.find({chatId}).lean()
        return res.json({error:false,message:'sucess',messages})
    }catch(err){
        return res.json({ error: true, message: 'internal server error' })
    }
}