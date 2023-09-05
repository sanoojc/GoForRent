import React from 'react'
import {Routes, Route} from 'react-router-dom'
import AdminRoutes from './Routes/AdminRoutes/AdminRoutes'
import axios from 'axios'
import UserRoutes from './Routes/UserRoutes/UserRoutes'

export default function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/admin/*' element={<AdminRoutes/>}></Route>
        <Route path="/*" element={<UserRoutes/>}></Route>
      </Routes>
    </div>
  )
}
