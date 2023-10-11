import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import BackdropLoader from '../Backdrop/Backdrop'
import {motion} from 'framer-motion'
import { useSelector } from 'react-redux'

function ResetPassword({ close }) {
  const [otp, setOtp] = useState('')
  const [open, setOpen] = useState(false)
  const {user}=useSelector((state)=>state)
  console.log(user)

  return (
    <AnimatePresence>
      <BackdropLoader openLoader={open} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2 }}
        exit={{ opacity: 2 }}
        className='fixed w-full min-h-screen z-10 insert-0  flex justify-center backdrop-blur-sm bg-opacity-50 items-center'>
        <div className=' bg-white w-5/6 sm:w-2/4 p-10 border shadow-lg rounded-xl'>
          {
            user.details.loginWithGoogle?(
          <div className="mb-5 sm:mx-5 flex flex-col items-center gap-4">
          <h1>Enter OTP</h1>
          <div className="">
          <p className='text-blue-500 flex justify-end pr-4 hover:cursor-pointer'>Resend</p>
          <input className='input input-bordered focus:border-0 mx-2 text-xl h-10' onChange={(e) => setOtp(e.target.value)} type="text" />
          </div>
          <div className=" flex gap-3">
          <button className='btn bg-red-600 btn-primary'>Submit</button>
          <button className='btn btn-secondary' onClick={close}>Cancel</button>
          </div>
         
          </div>
            ):(
              <div className="">
                <label htmlFor="">Current Password</label>
                <input type="text" className='input input-bordered' />
                <div className="">
                <button className='btn bg-red-600 btn-primary'>Change Password</button>
                <button className='btn btn-secondary' onClick={close}>Cancel</button>
                </div>
               
              </div>
            )
        }
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ResetPassword