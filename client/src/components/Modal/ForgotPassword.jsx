import React, { useState } from 'react'
import BackdropLoader from '../Backdrop/Backdrop'
import { AnimatePresence, motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import { forgotPassword } from '../../Api/UserApi'
import Otp from './Otp'
import NewPassword from './NewPassword'

function ForgotPassword({ close }) {
  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(false)
  const [emailModal, setEmailModal] = useState(true)
  const [validation, setValidation] = useState(false)


  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateEmail(email)) {
      setOpen(true)
      const { data } = await forgotPassword(email)
      setOpen(false)
      if (data.error)
        toast.error(data.message)
      else {
        toast.success(data.message)
        console.log('hi')
        setEmailModal(false)
      }
    }
    else {
      toast.error('Enter a valid email')
    }
  }
  return (
    <AnimatePresence>

      <BackdropLoader openLoader={open} />
      <Toaster />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2 }}
        exit={{ opacity: 2 }}
        className='fixed w-full h-screen z-10 insert-0  flex justify-center backdrop-blur-sm bg-opacity-50 items-center'>
        {
          emailModal ?
            (<div className="bg-white w-3/4 h-1/2 sm:h-1/2 sm:w-96 py-3 border rounded-lg shadow-md">
              <div className="flex justify-end  px-3 ">
                <h3 className='border rounded-full px-2 hover:cursor-pointer' onClick={close}>X</h3>
              </div>
              <div className="flex flex-col px-3 py-3 gap-3 justify-center">
                <h3 className='text-center pb-3'>Enter email</h3>
                <input className='border rounded-md pt-2 pl-2' type="email" onChange={(e) => setEmail(e.target.value)} />

                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Submit</button>

              </div>
            </div>) : (
          !validation ?
        (<Otp validation={()=>setValidation(true)} />) :(<NewPassword colse={close} email={email} />)
        
        )
          }
      </motion.div>
    </AnimatePresence>
  )
}

export default ForgotPassword 