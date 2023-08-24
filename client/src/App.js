import React, { useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import AdminRoutes from './Routes/AdminRoutes/AdminRoutes'
import axios from 'axios'
import UserRoutes from './Routes/UserRoutes/UserRoutes'
import { useDispatch, useSelector } from 'react-redux'
import { authenticate } from './Api/UserApi'
import { authenticateAdmin } from './Api/AdminApi'

export default function App() {
  axios.defaults.baseURL = "http://localhost:8000/"
  axios.defaults.withCredentials = true
  
  const dispatch = useDispatch();
  useEffect(()=>{
 (
  async function (){
    let {data}=await authenticate()
    dispatch({ type: "user", payload: { login: data.loggedIn, details:data.user } })
    let { data:adminData } = await authenticateAdmin()
      dispatch({ type: "admin", payload: { login: adminData.loggedIn } })
  })()
  },[refresh])
  return (
    <div className='app'>
      <Routes>
        <Route path='/admin/*' element={<AdminRoutes/>}></Route>
        <Route path="/*" element={<UserRoutes/>}></Route>
      </Routes>
    </div>
  )
}
