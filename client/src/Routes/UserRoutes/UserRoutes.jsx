import React, { useEffect } from 'react'
import {  Navigate, Route, Routes } from 'react-router-dom'
import Login from '../../components/User/Login/Login'
import Signup from '../../components/User/Signup/Signup'
import Landing from '../../components/User/Landing/Landing'
import { useDispatch, useSelector } from 'react-redux'
import { authenticate } from '../../Api/UserApi'
import ViewVehicle from '../../components/User/Vehicle/ViewVehicle'
import Profile from '../../components/User/Profile/Profile'
import Checkout from '../../components/User/Checkout/Checkout'
import Chat from '../../components/User/Chat/Chat'


function UserRoutes() {
  const {user,refresh}= useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch()

  useEffect(()=>{
    (async ()=>{
      let {data}=await authenticate()
      dispatch({ type: "user", payload: { login: data.login, details:data.user } })
    })()
  },[refresh])
  return (
        <Routes>
          {user?.login && (<>
            <Route path='/'  element={<Navigate to={'/home'}/>} />
            <Route path='/login' element={<Navigate to={'/home'}/>}/>
            <Route path='/signup' element={<Navigate to={'/home'}/>}/>
            <Route path='/home'  element={<Landing/>} />
            <Route path='/view' element={<ViewVehicle/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/chat' element={<Chat/>}/>

          </>
          )}
          {
            user?.login===false &&
            (
              <>
            <Route path='/' element={<Landing/>}/>
            <Route path='/home' element={<Navigate to={'/'}/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
              <Route path='/view' element={<ViewVehicle/>}/>
            <Route path='/profile' element={<Login/>}/>
            <Route path='/checkout'  element={<Navigate to={'/home'}/>}/>
            <Route path='/chat' element={<Navigate to={'/home'}/>}/>
            </>
          )}
        </Routes>
  )
}
export default UserRoutes