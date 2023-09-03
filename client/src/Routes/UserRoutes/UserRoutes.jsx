import React, { useEffect } from 'react'
import {  Navigate, Route, Routes } from 'react-router-dom'
import Login from '../../components/User/Login/Login'
import Signup from '../../components/User/Signup/Signup'
import Landing from '../../components/User/Landing/Landing'
import { useDispatch, useSelector } from 'react-redux'
import { authenticate } from '../../Api/UserApi'


function UserRoutes() {
  const {user, refresh}= useSelector((state) => {
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
            <Route path='/home'  element={<Landing/>} />
            <Route path='/login' element={<Navigate to={'/home'}/>}/>
            <Route path='/signup' element={<Navigate to={'/home'}/>}/>
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
            </>
          )}
        </Routes>
  )
}
export default UserRoutes