import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { SignupValidationSchema } from '../../../Validations/SignupValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { sentOtp, signup } from '../../../Api/UserApi';
import Swal from 'sweetalert2'

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(SignupValidationSchema),
  });
  const navigate = useNavigate();
  const onSubmit =async (details) => {
    let {data}= await signup(details) 
      if(data.error){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.message
        })
    }else{
      Swal.fire({
        title: 'Enter OTP',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Verify',
        cancelButtonText: 'Cancel',
        preConfirm: async (inputOtp) => {
          if (!inputOtp) {
            Swal.showValidationMessage('OTP is required');
          } else {
            try {
              const {data} = await sentOtp(inputOtp, details);
              console.log(data,'........')
              if(data.error){
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: data.message
                })
              }else{
                navigate('/login')
              }
            } catch (error) {
              console.error('Error sending OTP:', error);
              Swal.showValidationMessage('Error sending OTP');
            }
          }
        }
      });
    }
  };

  return (
    <div className="login-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="login-box">
        <div className="login-input-box">
          <div>
            <p>Name</p>
            <input style={{ border: '0', borderRadius: '5px' }} type="text" {...register("name")} placeholder='Name' />
            {errors.name && <p className='text-danger'>{errors.name.message}</p>}
          </div>
          <div>
            <p>Email</p>
            <input style={{ border: '0', borderRadius: '5px' }} type="text" {...register("email")} placeholder='Email' />
            {errors.email && <p className='text-danger'>{errors.email.message}</p>}
          </div>
          <div>
            <p>Phone no </p>
            <input style={{ border: '0', borderRadius: '5px' }} type="text" {...register("number")} placeholder='Phone no' />
            {errors.number && <p className='text-danger'>{errors.number.message}</p>}
          </div>
          <div> 
            <p>Password</p>
            <input style={{ border: '0', borderRadius: '5px' }} type="password" {...register("password")} placeholder='Password' />
            {errors.password && <p className='text-danger'>{errors.password.message}</p>}
          </div>
          <div>
            <p>Confirm password</p>
            <input style={{ border: '0', borderRadius: '5px' }} type="password" {...register("confirmPassword")} placeholder='confirm' />
            {errors.confirmPassword && <p className='text-danger'>{errors.confirmPassword.message}</p>}
          </div>
          {/* Repeat similar code for other input fields */}
        </div>
        <div className="login-btn-container">
          <button type="submit">Sign Up</button>
          <p>Already have an account? <Link to='/login'>Sign In</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
