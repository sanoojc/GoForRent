import React, { useEffect, useState } from 'react';
import './Signup.css'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { SignupValidationSchema } from '../../../Validations/SignupValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { resendOtp, sentOtp, signup } from '../../../Api/UserApi';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { Toaster, toast } from 'react-hot-toast'

function Signup() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(SignupValidationSchema),
  });
  
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [resend, setResend] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [showModal, setShowModal] = useState(false)
  const [otp,setOtp]=useState('')
  const [email,setEmail]=useState({})

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    let intervalId;
    if (countdown > 0 && resend) {
      intervalId = setInterval(() => {
        setCountdown((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
      setResend(false)
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [countdown, resend]);

const handleOtp=(e)=>setOtp(e.target.value)

  const onSubmit = async (details) => {
    let { data } = await signup(details)
    if(data.error){
      toast.error(data.message)
    }else{
      setOpen(true)
      setEmail({email:details.email})
      console.log(email)
      toast.success('OTP has been sent');
      setShowModal(true)
      setResend(true)
    }
  };
  const resendOTP=async ()=>{
    let {data}=await resendOtp(email)
    if(data.error){
      toast.error(data.message)
    }else{
      toast.success(data.message)
      setCountdown(5)
      setResend(!resend)
    }
  }
  const verifyOtp=async ()=>{
    if(!otp){
      toast.error('invalid OTP')
    }else{
      const {data}=await sentOtp(otp)
      if(data.error){
        toast.error(data.message)
      }else{
        toast.success(data.message)
        navigate('/login')
      }

    }
  }

  return (
    <>
      {
        showModal &&
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Enter OTP
              </Typography>
              <Typography>Resend in {countdown} seconds</Typography>
              <div className="" style={{paddingBottom:'10px'}}>
              <TextField
                size='small'
                type='text'
                name='otp'
                value={otp}
                onChange={handleOtp}
                />
                {
                  countdown>0?
                  <Button variant="contained" disabled
                   >Resend OTP</Button>:<Button onClick={resendOTP}  variant="contained" 
                   >Resend OTP</Button>
                }
              </div>
                <Button variant="contained" onClick={verifyOtp}>Verify OTP</Button>
                <Button variant="contained" >Cancel</Button>
            </Box>
          </Modal>
        </div>
      }
      <Toaster />
      <div className="login-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="login-box">
          <div className="signup-input-box" style={{ gap: '20px' }}>
            <div>
              <TextField
                required
                size='small'
                type='text'
                id="outlined-required"
                label="Name"
                {...register('name')}
              />
              {errors.name && <p className='text-danger'>{errors.name.message}</p>}
            </div>
            <div>
              <TextField
                required
                size='small'
                type='text'
                id="outlined-required"
                label="Email"
                {...register('email')}
              />
              {errors.email && <p className='text-danger'>{errors.email.message}</p>}
            </div>
            <div>
              <TextField
                required
                size='small'
                type='number'
                id="outlined-required"
                label="Phone no"
                {...register('number')}
              />
              {errors.number && <p className='text-danger'>{errors.number.message}</p>}
            </div>
            <div>
              <TextField
                required
                size='small'
                type='password'
                id="outlined-required"
                label="Password"
                {...register('password')}
              />
              {errors.password && <p className='text-danger'>{errors.password.message}</p>}
            </div>
            <div>
              <TextField
                required
                size='small'
                type='password'
                id="outlined-required"
                label="Confirm"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && <p className='text-danger'>{errors.confirmPassword.message}</p>}
            </div>
          </div>
          <div className="signup-btn-container">
            <Button variant="contained" type='submit'>Sign up</Button>
            <p>Have an account ?<Link to='/login'> Sign In</Link></p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
