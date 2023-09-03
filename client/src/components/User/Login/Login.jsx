import React, { useState } from 'react';
import './Login.css'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginValidationSchema } from '../../../Validations/LoginValidation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from '../../../Api/UserApi';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'
import TextField from '@mui/material/TextField'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import {Toaster, toast} from 'react-hot-toast'
import {useGoogleLogin} from '@react-oauth/google'


function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // const [passwordType, setPasswordType] = useState('password')
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginValidationSchema)
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // function showPassword() {
  //   passwordType === 'password' ? setPasswordType('text') : setPasswordType('password')
  // }

  const [loading, setLoading] = useState({ submit: false })
  const submit = async (details) => {
    setLoading({ ...loading, submit: true })
    let { data } = await login(details)
    if (data.error) {
     toast.error(data.message)
    } else {
      navigate('/')
      dispatch({ type: 'refresh' })
    }
    setLoading({ ...loading, submit: false })
  }
  
  // const googleLogin = useGoogleLogin({
  //   onSuccess: (codeResponse) => {
  //       try {
  //           loginWithGoogle(codeResponse)
  //           .then((response) => {
           
  //               if (!response.data.user.status) {
  //                 generateError("Sorry You are banned")
  //                   // navigate('/account/suspended');
  //               }else{
  //                   localStorage.setItem('JwtToken', response.data.token);
  //                   dispatch(
  //                       setUserDetails({
  //                           name: response.data.user.firstName,
  //                           id: response.data.user._id,
  //                           email: response.data.user.email,
  //                           image: response.data.user.picture,
  //                           token: response.data.token,
  //                       })
  //                   );
  //                   navigate("/");
  //               }
  //           }).catch((err) => {
  //               generateError("Something went wrong please reload the page") })
  //       } catch (err) {
  //           generateError("Something went wrong please reload the page")
  //       }
  //   },
  //   onError: (error) => {
  //       generateError("Login Failed")
  //   }
  // });
  return (
    <>
    <Toaster/>
   
    <div className="login-container">
      <form onSubmit={handleSubmit(submit)} className="login-box">
        <div className="login-input-box">
          <div style={{paddingBottom:'10px'}}>
            <p>Email</p>
            <TextField
              required
              fullWidth
              size='small'
              type='email'
              id="outlined-required"
              label="Required"
              {...register('email')}
              
            />

            {/* <input  style={{ border: '0', borderRadius: '5px' }} type="email" {...register("email")} placeholder='Email' /> */}
            {errors.email && <p className='text-danger'>{errors.email.message}</p>}
          </div>
          <>
            <p>password</p>
            <>
              <FormControl sx={{ width: '28ch' }} variant="outlined">
                
                <InputLabel htmlFor="outlined-adornment-password" required size='small'>Required</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Required"
                  size='small'
                  {...register('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {/* <input  style={{ width: '130px', border: '0' }} type={passwordType} {...register("password")} placeholder='Password' /><button style={{ border: '0', background: '#fff',color:'black', width: '40px' }} onClick={showPassword}>{passwordType === 'password' ? "show" : "hide"}</button> */}
              {errors.password && <p className='text-danger'>{errors.password.message}</p>}
            </>
          </>
        </div>
        <div className="login-btn-container">
          <Button variant="contained" type='submit' color='primary'> Login<ClipLoader size={50} color='white' loading={loading.submit} /></Button>
          <Button variant="outlined" endIcon={<GoogleIcon/>}>sign in with</Button>
          <><p>Don't have an account?<Link to='/signup'> sign up</Link></p></>
          <><Link to='/forgotpassword' >Forgot password?</Link></>
        </div>
      </form>

    </div>
    </>
  );
}

export default Login;