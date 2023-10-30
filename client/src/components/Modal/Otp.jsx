import { AnimatePresence,motion } from 'framer-motion'
import React, { useState } from 'react'
import { resendOtp, verifyMail } from '../../Api/UserApi'
import toast, { Toaster } from 'react-hot-toast'
import BackdropLoader from '../Backdrop/Backdrop'

function Otp({validation}) {
  const[otp,setOtp]=useState('')
  const[open,setOpen]=useState(false)

  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(otp.trim()==''){
      toast.error('Enter OTP !')
    }else{
      setOpen(true)
      const{data}=await verifyMail({otp})
      setOpen(false)
      if(data.error){
        toast.error(data.message)
      }else{
        toast.success('Sucess')
        validation()
      }

    }
  }
  const resendOTP=async()=>{
    const{data}=await resendOtp(email)
  }
  return (
    <AnimatePresence>
      <Toaster/>
      <BackdropLoader openLoader={open}/>
     <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2 }}
        exit={{ opacity: 2 }}
        className='fixed w-full h-screen z-10 insert-0  flex justify-center backdrop-blur-sm bg-opacity-50 items-center'>
        <div className="bg-white w-3/4 h-1/2 sm:h-1/2 sm:w-96 py-3 border rounded-lg shadow-md">
          <div className="flex justify-end  px-3 ">
            <h3 className='border rounded-full px-2 hover:cursor-pointer' onClick={close}>X</h3>
          </div>
          <div className="flex flex-col px-3 py-3 gap-3 justify-center">
            <h3 className='text-center pb-3'>Enter OTP</h3>
              <p className="text-blue-500 text-end pr-4 bottom-0">resend</p>
            <input className='border rounded-md pt-2 pl-2' type="text" onChange={(e) => setOtp(e.target.value)} />

            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Submit</button>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Otp