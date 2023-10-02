import React, { useEffect, useState } from 'react'
import './Chat.css'
import { useSelector } from 'react-redux'
import { userChats } from '../../../Api/UserApi'
import Conversation from '../../Conversation/Conversation'
import Header from '../Header/Header'
import ChatBox from '../../ChatBox/ChatBox'

function Chat() {
    const { user } = useSelector((state) => state)
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    useEffect(() => {
        (async () => {
            const { data } = await userChats(user.details._id)
            setChats(data.chat)
        })()
    }, [])
    return (
        <> 
        <Header/>
            <div className="Chat mt-1 pt-2">
                {/* left side */}
                <div className="Left-side-chat">
                    <div className="Chat-container">
                        <h2>Chats</h2>
                        <div className="Chat-list">
                            {
                                chats.map((chat) => (
                                    <div className="" onClick={()=>setCurrentChat(chat)}>
                                        <Conversation data={chat} currentUserId={user.details._id} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                {/* Right side  */}
                <div className="Right-side-chat">
                    <ChatBox chat={currentChat} currentUser={user.details._id} />

                </div>
            </div>
        </>
    )
}

export default Chat