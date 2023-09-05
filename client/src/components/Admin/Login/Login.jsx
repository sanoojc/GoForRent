import React, { useState } from 'react'
import '../../User/Login/Login.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginValidationSchema } from '../../../Validations/LoginValidation'
import { adminLogin } from '../../../Api/AdminApi'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { Button, TextField } from '@mui/material'

function Login() {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginValidationSchema)
  })
  const submit = async (details) => {
    adminLogin(details).then((res) => {
      if (res.data.error) {
        toast.error(res.data.message)
      }
      else {
        localStorage.setItem('adminToken', res.data.token)
        toast.success(res.data.message)
        dispatch({ type: 'refresh' })
      }
    }).catch((err)=>console.log(err))
  }
  return (
    <>
      <Toaster />
      <div className="login-container">
        <form onSubmit={handleSubmit(submit)} className="login-box">
          <div className="login-input-box">
            <>
              <p>email</p>
              <TextField required type="email" {...register("email")} placeholder='Email' size='small' />
              {errors.email && <p className='text-danger'>{errors.email.message}</p>}
            </>
            <>
              <p>password</p>
              <>
                <TextField required type='password' {...register("password")} placeholder='Password' size='small' />
                {errors.password && <p className='text-danger'>{errors.password.message}</p>}
              </>
            </>
          </div>
          <div className="login-btn-container">
            <Button variant='outlined' type='submit' >login</Button>
          </div>
        </form>
      </div>
    </>
  )
}
export default Login