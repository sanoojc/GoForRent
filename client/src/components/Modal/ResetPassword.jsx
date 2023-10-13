// import { AnimatePresence } from 'framer-motion'
// import React, { useState } from 'react'
// import BackdropLoader from '../Backdrop/Backdrop'
// import {motion} from 'framer-motion'
// import { useSelector } from 'react-redux'

// function ResetPassword({ close }) {
//   const [otp, setOtp] = useState('')
//   const [open, setOpen] = useState(false)
//   const {user}=useSelector((state)=>state)
//   console.log(user)

//   return (
//     <AnimatePresence>
//       <BackdropLoader openLoader={open} />
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 2 }}
//         exit={{ opacity: 2 }}
//         className='fixed w-full min-h-screen z-10 insert-0  flex justify-center backdrop-blur-sm bg-opacity-50 items-center'>
//         <div className=' bg-white w-5/6 sm:w-2/4 p-10 border shadow-lg rounded-xl'>
//           {
//             user.details.loginWithGoogle?(
//           <div className="mb-5 sm:mx-5 flex flex-col items-center gap-4">
//           <h1>Enter OTP</h1>
//           <div className="">
//           <p className='text-blue-500 flex justify-end pr-4 hover:cursor-pointer'>Resend</p>
//           <input className='input input-bordered focus:border-0 mx-2 text-xl h-10' onChange={(e) => setOtp(e.target.value)} type="text" />
//           </div>
//           <div className=" flex gap-3">
//           <button className='btn bg-red-600 btn-primary'>Submit</button>
//           <button className='btn btn-secondary' onClick={close}>Cancel</button>
//           </div>

//           </div>
//             ):(
//               <div className="">
//                 <label htmlFor="">Current Password</label>
//                 <input type="text" className='input input-bordered' />
//                 <div className="">
//                 <button className='btn bg-red-600 btn-primary'>Change Password</button>
//                 <button className='btn btn-secondary' onClick={close}>Cancel</button>
//                 </div>

//               </div>
//             )
//         }
//         </div>
//       </motion.div>
//     </AnimatePresence>
//   )
// }

// export default ResetPassword






import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { AnimatePresence,motion } from 'framer-motion';
import BackdropLoader from '../Backdrop/Backdrop';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster,toast } from 'react-hot-toast';
import { useState } from 'react';
import { changePassword } from '../../Api/UserApi';
import { Password } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant='contained' size='large' className='' onClick={handleOpen}>Change</Button>
      <Toaster/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function ResetPassword({ openModal, close }) {
  const dispatch=useDispatch()
  const [open,setOpen]=useState(false)
  const [otp,setOtp]=useState('')
  const [currentPassword,setCurrentPassword]=useState('')
  const [newPassword,setNewPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const {user}=useSelector((state)=>state)
  const handleChange=async()=>{
    if(currentPassword.trim()===''||newPassword.trim()===''||confirmPassword.trim()===''){
      toast.error('Fill all fields')
    }
    else if(newPassword===confirmPassword){
      if(newPassword.length>=4){
        const details={
          id:user.details._id,
          currentPassword,
          newPassword,
          confirmPassword
        }
        const {data}=await changePassword(details)
        if(data.error){
          toast.error(data.message)
        }else{
          toast.success(data.message)
          dispatch({type:'refresh'})
          close()
        }
      }else{
        toast.error('At least 4 charecter is required')
      }
    }else{

      toast.error('Passwords does not match')
    }
  }
  return (
    <div>
      <Modal
        open={openModal}
        onClose={close}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <AnimatePresence>
          <BackdropLoader openLoader={open} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 2 }}
            exit={{ opacity: 2 }}
            className='fixed w-full min-h-screen z-10 insert-0  flex justify-center backdrop-blur-sm bg-opacity-50 items-center'>
            <div className=' bg-white w-5/6 sm:w-2/4 p-10 border shadow-lg rounded-xl'>
            <Toaster/>
              <div className="flex justify-end">
                <h3 onClick={close} className='border-2 rounded-full px-2 hover:cursor-pointer '>X</h3>
              </div>
              {
                user.details.loginWithGoogle ? (
                  <div className="mb-5 sm:mx-5 flex flex-col items-center gap-4">
                    <h1>Enter OTP</h1>
                    <div className="">
                      <p className='text-blue-500 flex justify-end pr-4 hover:cursor-pointer'>Resend</p>
                      <input className='input input-bordered focus:border-0 mx-2 text-xl h-10' onChange={(e) => setOtp(e.target.value)} type="text" />
                    </div>
                    <div className=" flex gap-3">
                    <ChildModal/>
                      <button className='btn btn-secondary' onClick={close}>Cancel</button>
                    </div>

                  </div>
                ) : (
                  <div className="flex flex-col px-2">
                    <label className='font-bold text-xl mb-2 mt-4' htmlFor="">Current Password</label>
                    <input onChange={(e)=>setCurrentPassword(e.target.value)} value={currentPassword} type="text" className='input h-10 pt-2 input-bordered' />
                    <label className='font-bold text-xl mb-2 mt-4' htmlFor="">New Password</label>
                    <input onChange={(e)=>setNewPassword(e.target.value)} value={newPassword} type="text" className='input h-10 pt-2 input-bordered' />
                    <label className='font-bold text-xl mb-2 mt-4' htmlFor="">confirm</label>
                    <input onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} type="text" className='input h-10 pt-2 input-bordered' />
                    <div className="flex gap-3 items-center justify-center mt-5">
                      <button onClick={handleChange} className='btn bg-red-600 btn-primary'>Change Password</button>
                      <button className='btn btn-danger' onClick={close}>Cancel</button>
                    </div>
                  </div>
                )
              }
            </div>
           
          </motion.div>
        </AnimatePresence>
      </Modal>
    </div>
  );
}
