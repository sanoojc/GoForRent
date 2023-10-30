import { AnimatePresence,motion } from 'framer-motion'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { setNewPassword } from '../../Api/UserApi'

function NewPassword({email,close}) {
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const handleChange=async()=>{
    if(password.trim()=='' || password.length<4){
      toast.error('Password must be atleast 4 digits !')
    }else if(password!==confirmPassword){
      toast.error('Password doesnt match')
    }else{
      const {data}=await setNewPassword({password,email,confirmPassword})
      if(data.error){
        toast.error(data.message)
      }else{
        toast.success('Success')
        close

      }
    }
  }
  return (

    <AnimatePresence>
        <motion.div className="">
          <Toaster/>
        <div className="flex flex-col px-2">
                    <label className='font-bold text-xl mb-2 mt-4' htmlFor="">New Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} type="text" className='input h-10 pt-2 input-bordered' />
                    <label className='font-bold text-xl mb-2 mt-4' htmlFor="">confirm</label>
                    <input onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} type="text" className='input h-10 pt-2 input-bordered' />
                    <div className="flex gap-3 items-center justify-center mt-5">
                      <button onClick={handleChange} className='btn bg-red-600 btn-primary'>Change Password</button>
                      <button className='btn btn-danger' onClick={close}>Cancel</button>
                    </div>
                  </div>
        </motion.div>
    </AnimatePresence>
  )
}

export default NewPassword