import React, { useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { getMessages, getUser } from '../../Api/UserApi';
import {format} from 'timeago.js'
import InputEmoji from 'react-input-emoji'

function ChatBox({ chat, currentUser }) {
    const [reciverData, setReciverData] = useState(null)
    const [messages,setMessages]=useState([])
    const [newMessage,setNewMessage]=useState('')
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
                                <div className='flex'>
                                    <div className="followerImage w-12 h-12">
                                        <PersonIcon /></div>
                                    <div className="name text-sm">
                                        <span>Admin</span>
    
                                    </div>
                                </div>
                            </div>
                            <hr style={{width:'85%',border:'0.1px solid '}} />
                        </div>
                        {/* messages */}
                        <div className="chat-body">
                            {
                                messages.map((message)=>(
                                    <>
                                      <div className={message.senderId===currentUser? "message own":"message"}>
                                            <span>{message.text}</span><br/>
                                            <span className='text-xs'>{format(message.createdAt) }</span>
                                        </div>  
                                    </>
                                ))
                            }
                        </div>
                        <div className="chat-sender">
                            <div className="">+</div>
                            <InputEmoji
                                value={newMessage}
                                onChange={handleChange}
                            />
                            <div className="send-button button">Send</div>
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