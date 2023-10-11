import React, { useState } from 'react'

export default function AddProof() {
    const [open,setOpen]=useState(false)
    return (
        <AnimatePresence>

            <BackdropLoader openLoader={open} />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 2 }}
                exit={{ opacity: 2 }}
                className='fixed w-full min-h-screen z-10 insert-0  flex justify-center backdrop-blur-sm bg-opacity-50 items-center'>
                    <div className="">
                        <label htmlFor="">License Number</label>
                        <input type="text" />
                        <label htmlFor="">License Number</label>
                        <input type="text" />
                        <select  name="" id="">
                            <option value="Aadhar">Aadhar</option>
                            <option value="VoterID">Voter ID</option>
                        </select>
                        <label htmlFor="">ID Number</label>
                        <input type="text" />
                        <label htmlFor="">Image</label>
                        <input type="text" />
                    </div>
            </motion.div>
        </AnimatePresence>

    )
}
