import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function EditProfileModal({ user, close }) {
    console.log(user)
    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress)
    })
    const handleKeyPress = (e) => {
        if (e.key === "Escape") {
            close()
        }
    }
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 2 }}
                exit={{ opacity: 2 }}
                className='fixed w-full min-h-screen z-10 insert-0  flex justify-center backdrop-blur-sm bg-opacity-50 items-center'>
                <div className="">
                    <button onClick={close} className='text-4xl'>X</button>
                    <form action="">
                        <label htmlFor="">Name</label>
                        <input type="text" value={user.details.name} />
                        <label htmlFor="">change Profile</label>
                        <input type="file" />
                    </form>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default EditProfileModal