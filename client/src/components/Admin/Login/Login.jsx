import React, { useState } from 'react'
import'../../User/Login/Login.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginValidationSchema } from '../../../Validations/LoginValidation'
import { adminLogin } from '../../../Api/AdminApi'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Toaster,toast} from 'react-hot-toast'

function Login() {
    const dispatch=useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginValidationSchema)
    })
    const submit = async (details) => {
        let {data}=await adminLogin(details)
        console.log(data,'admin')
        if(data.error){
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: data.message
            //   })
            toast.error(data.message)
        }
        else{
          dispatch({type:'refresh'})
        }
   }

    return (
      <>
    
      <Toaster/>
        <div className="login-container">
        <form onSubmit={handleSubmit(submit)} className="login-box">
          <div className="login-input-box">
            <>
              <p>email</p>
              <input  style={{ border: '0', borderRadius: '5px' }} type="email" {...register("email")} placeholder='Email' />
              {errors.email && <p className='text-danger'>{errors.email.message}</p>}
            </>
            <>
              <p>password</p>
              <>
                <input  style={{border: '0', borderRadius: '5px'  }} type='password' {...register("password")} placeholder='Password' />
                {errors.password && <p className='text-danger'>{errors.password.message}</p>}
              </>
            </>
          </div>
          <div className="login-btn-container">
            <button className=''style={{border:'1px solid',padding:'5px',borderRadius:'5px'}}>login</button>
          </div>
        </form>
  
      </div>
      </>
    )
}

export default Login