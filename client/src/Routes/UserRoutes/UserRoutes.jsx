import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../../components/User/Login/Login'
import Signup from '../../components/User/Signup/Signup'
import Landing from '../../components/User/Landing/Landing'

function UserRoutes() {
  const {user,refresh} = useSelector((state) => {
    return state;
  });
  return (
    <div>
        <Routes>
          {user.login}
            <Route path='/' element={<Landing/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            
        </Routes>
    </div>
  )
}

export default UserRoutes