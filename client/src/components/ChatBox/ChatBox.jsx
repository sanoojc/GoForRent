import React, { useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { addMessage, getMessages, getUser } from '../../Api/UserApi';
import {format} from 'timeago.js'
import InputEmoji from 'react-input-emoji'

function ChatBox({ chat, currentUser,setSendMessage,reciveMessage }) {
    const [reciverData, setReciverData] = useState(null)
    const [messages,setMessages]=useState([])
    const [newMessage,setNewMessage]=useState('')

    useEffect(()=>{
        if(reciveMessage!==null && chat._id===reciveMessage.chatId){
            setMessages([...messages,reciveMessage ])
        }
    },[reciveMessage])
    useEffect(() => {
        const id = chat?.members?.find((id) => id !== currentUser)
        if (chat !== null) {
            (async () => {
                const { data } = await getUser(id)
                setReciverData(data.admin)
            })()
        }
    }, [chat, currentUser])

    useEffect(()=>{
        if(chat!==null){
            (async()=>{
                const {data}=await getMessages(chat._id)
                console.log(data)
                setMessages(data.messages)

            })()
        }
    },[chat])
    const handleSend=async(e)=>{
        e.preventDefault()
        const message={
            senderId:currentUser,
            text:newMessage,
            chatId:chat._id 
        }
        const {data}=await addMessage(message)
        console.log(data,'kkkkkkkkkk')
        setMessages([...messages,data.messages])
        setNewMessage('')
        const reciverId=chat.members.find((id)=>id!==currentUser)
        setSendMessage(...messages,reciverId)
    }
    const handleChange=(newMessage)=>{
        setNewMessage(newMessage)
    }
    return (
        <>
            <div className="ChatBox-container">
                {
                    chat?(
                        <>
                        <div className="chat-header">
                            <div className="follower">
                                <div className='flex pt-3'>
                                    <div className="followerImage w-12 h-12">
                                        <PersonIcon /></div>
                                    <div className="name text-sm ">
                                        <span>Admin</span>
    
                                    </div>
                                </div>
                            </div>
                            <hr style={{width:'85%',border:'0.1px solid '}} />
                        </div>
                        {/* messages */}
                        <div className="chat-body h-96 flex flex-col gap-3 overflow-y-scroll px-3 border-b-2">
                            {
                                messages.map((message)=>(
                                    <>
                                      <div className={message.senderId===currentUser? "flex justify-end":"flex justify-start"}>
                                        <div className="max-w-lg border rounded-md shadow-md p-2 flex flex-col">
                                            <span>{message.text}</span>
                                            <span className='text-xs'>{format(message.createdAt) }</span>
                                        </div>
                                        </div>  
                                    </>
                                ))
                            }
                        </div>
                        <div className="chat-sender flex items-center pt-2 px-2">
                            <div className="font-bold">+</div>
                            <InputEmoji
                                value={newMessage}
                                onChange={handleChange}
                            />
                            <div onClick={handleSend} className="send-button button border mx-3 bg-blue-400 cursor-pointer px-4 py-2 rounded-md shadow-sm">Send</div> 
                        </div>
                    </>
                    ):(
                        <span className='chatbox-empty-message' >Select a Conversation</span>
                    )
                }
               
            </div>
        </>
    )
}

export default ChatBox