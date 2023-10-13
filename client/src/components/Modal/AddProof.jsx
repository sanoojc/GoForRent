import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import BackdropLoader from '../Backdrop/Backdrop'

export default function AddProof({close}) {
    const [open, setOpen] = useState(false)
    return (
        <AnimatePresence>
            <BackdropLoader openLoader={open} />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 2 }}
                exit={{ opacity: 2 }}
                className='fixed w-full min-h-screen z-10 insert-0  flex justify-center backdrop-blur-sm bg-opacity-50 items-center'>
                <div className=" bg-white p-10 border w-5/6 sm:w-2/4 mb-20 rounded-lg shadow-md">
                    <div className=" flex justify-end pb-5">
                    <h2 onClick={close} className='border-2 px-2 rounded-full hover:cursor-pointer hover:bg-slate-500 hover:text-white ' >X</h2>
                    </div>
                    <div className=" flex justify-center pb-5">
                    <h2>Add Proof</h2>
                    </div>
                    <div className="flex flex-col gap-2 sm:gap-3 font-bold">
                        <label htmlFor="">License Number</label>
                        <input className='border rounded-md' type="text" />
                        <label htmlFor="">License Number</label>
                        <input className='border rounded-md' type="text" />
                        <label htmlFor="">ID Type</label>
                        <select className='border rounded-md h-12 px-2' name="" id="">
                            <option value="Aadhar">Aadhar</option>
                            <option value="VoterID">Voter ID</option>
                        </select>
                        <label htmlFor="">ID Number</label>
                        <input className='border rounded-md' type="text" />
                        <label htmlFor="">Image</label>
                        <input className='border rounded-md' type="text" />
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>

    )
}
