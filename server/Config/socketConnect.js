import {Server} from "socket.io"

export default function socketConnect(io, activeUsers){
    io.on("connection",(socket)=>{
        socket.on("new-user-add",(newUserId)=>{
            if (!activeUsers[newUserId]) {
                activeUsers[newUserId] = { userId: newUserId, socketId: socket.id }
                console.log("New User Connected", activeUsers);
            }
            console.log("active",activeUsers);
            io.emit("get-users", activeUsers);

        })
        socket.on('send-message',(data)=>{
            const{reciverId}=data
            const user=activeUsers[reciverId]
            console.log('sending to ',reciverId)
            if(user){
                io.to(user.socketId).emit('recive-message',data)
            }
        })
        socket.on("disconnect",()=>{
            Object.keys(activeUsers).forEach((key) => {
                if(activeUsers[key].socketId === socket.id) {
                     delete activeUsers[key] 
                }
            });
        console.log("disconnect", socket.id)
        console.log("User Disconnected", activeUsers);
        io.emit("get-users", activeUsers);
        })
    })
}