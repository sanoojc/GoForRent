import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import BackdropLoader from '../Backdrop/Backdrop'

export default function AddProof({ close }) {
    const [open, setOpen] = useState(false)
    return (
        <AnimatePresence>
            <BackdropLoader openLoader={open} />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 2 }}
                exit={{ opacity: 2 }}
                className='fixed w-full h-screen z-10 insert-0  flex justify-center backdrop-blur-sm bg-opacity-50 items-center'>
                <div className=" bg-white p-10 border w-5/6 sm:w-2/4 mb-20 rounded-lg shadow-md h-3/4 overflow-y-scroll">
                    <div className=" flex justify-end">
                        <h2 onClick={close} className='border-2 px-2 rounded-full hover:cursor-pointer hover:bg-slate-500 hover:text-white ' >X</h2>
                    </div>
                    <div className="flex flex-col gap-2 sm:gap-3 font-bold">
                        <label htmlFor="">License Number</label>
                        <input className='border rounded-md' type="text" />
                        <div className="p-3 border rounded-md mt-1">
                            <label className='flex justify-center font-bold text-lg' htmlFor="">License Image</label>
                            <div className=" px-2 flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <label className='pl-5 pb-2' htmlFor="">Front</label>
                                    <input className='pl-2 pt-2 border rounded-md' type="file" accept='image/*' />
                                </div>
                                <div className="flex flex-col">
                                    <label className='pl-5 pb-2' htmlFor="">Back</label>
                                    <input className='border rounded-md pl-2 pt-2  ' type="file" accept='image/*' />
                                </div>
                            </div>
                        </div>

                        <label className='py-2' htmlFor="">ID Type</label>
                        <select className='border rounded-md h-12 px-2' name="" id="">
                            <option value="Aadhar">Aadhar</option>
                            <option value="VoterID">Voter ID</option>
                        </select>
                        <label htmlFor="">ID Number</label>
                        <input className='border rounded-md' type="text" />
                        <div className=" p-3 border rounded-md mt-1">
                            <label className='flex justify-center' htmlFor="">Image</label>
                            <div className="flex flex-col gap-2">
                                <label className='pl-5 pb-2' htmlFor="">Front</label>
                                <input className='pl-2 pt-2 border rounded-md' type="file" accept='image/*' />
                                <label className='pl-5 pb-2' htmlFor="">Back</label>
                                <input className='pl-2 pt-2 border rounded-md' type="file" accept='image/*' />
                            </div>
                        </div>
                        <div className="flex justify-center pt-3">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                ADD
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>

    )
}
