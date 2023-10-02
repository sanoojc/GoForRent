import React, { useEffect, useState } from 'react'
import { getUser } from '../../Api/UserApi'
import PersonIcon from '@mui/icons-material/Person';
import {io} from "socket.io-client"

function Conversation({ data, currentUserId }) {

    const [reciverData, setReciverData] = useState(null)
    const userId = data.members.find(id => id !== currentUserId)
    console.log(userId)

    useEffect(() => {
        (async () => {
            const res = await getUser(userId)
            setReciverData(res.data.admin)

        })()
    }, [])
    return (
        <>
            <div className="follower conversation">
                <div className='flex items-center gap-2'>
                    <div className="">
                        <div className="online-dot"></div>
                        <div className="followerImage w-12 h-12"><PersonIcon /></div>
                    </div>
                    <div className="name text-sm flex flex-col">
                        <span className='font-bold'>Admin</span>
                        <span>Online</span>
                    </div>
                </div>
            </div>
            <hr style={{ width: '85%', border: '0.2px solid #ececec' }} />
        </>

    )
}

export default Conversation