import React from 'react'
import Login from './components/User/Login/Login'
import {Routes, Route} from 'react-router-dom'

export default function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </div>
  )
}
