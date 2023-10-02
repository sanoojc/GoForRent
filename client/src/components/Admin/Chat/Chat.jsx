import React from 'react'
import './chat.css'
import Header from '../../User/Header/Header'

function Chat() {
  return (
    <>
    <Header/>
    <div className="Chat">
        {/* left side */}
        <div className="Left-side-chat">
            <h2>Chats</h2>
        </div>
        {/* Right side  */}
        <div className="Right-side-chat">
             
        </div>
    </div>
    </>
  )
}

export default Chat