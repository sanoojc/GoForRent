import React, { useState } from 'react';
import './Login.css'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginValidationSchema } from '../../../Validations/LoginValidation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from '../../../Api/UserApi';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [passwordType, setPasswordType] = useState('password')
  const {register,handleSubmit,formState:{errors}}=useForm({
    resolver:yupResolver(loginValidationSchema)
  })
  const dispatch=useDispatch()
  const navigate=useNavigate()
  function showPassword() {
    passwordType === 'password' ? setPasswordType('text') : setPasswordType('password')
  }
const submit=async(details)=>{
  let {data}=await login(details)
  if(data.error){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: data.message
    })
  }else{
    navigate('/')
    dispatch({type:'refresh'})
  }
}
  return (
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
              <input  style={{ width: '130px', border: '0' }} type={passwordType} {...register("password")} placeholder='Password' /><button style={{ border: '0', background: '#fff',color:'black', width: '40px' }} onClick={showPassword}>{passwordType === 'password' ? "show" : "hide"}</button>
              {errors.password && <p className='text-danger'>{errors.password.message}</p>}
            </>
          </>
        </div>
        <div className="login-btn-container">
          <button>login</button>
          <button>sign in with google</button>
          <p>don't have an account?<Link to='/signup'> sign up</Link></p>
          <Link to='/forgotpassword' >forgot password</Link>
        </div>
      </form>

    </div>
  );
}

export default Login;