import React from 'react'
import {Routes, Route} from 'react-router-dom'
import AdminRoutes from './Routes/AdminRoutes/AdminRoutes'
import axios from 'axios'
import UserRoutes from './Routes/UserRoutes/UserRoutes'
import env from "react-dotenv";

export default function App() {
  axios.defaults.baseURL = "http://localhost:8000/"
  axios.defaults.withCredentials = true

  return (
    <div className='app'>
      <Routes>
        <Route path='/admin/*' element={<AdminRoutes/>}></Route>
        <Route path="/*" element={<UserRoutes/>}></Route>
      </Routes>
    </div>
  )
}
