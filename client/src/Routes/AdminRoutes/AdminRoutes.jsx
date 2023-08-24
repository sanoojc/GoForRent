import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from '../../components/Admin/Login/Login'

function AdminRoutes() {
  const {admin,refresh} = useSelector((state) => {
    return state;
  });
  return (
    <div>
        <Routes>
          {
            
          }
            <Route path='/' element={<Login></Login>}></Route>
        </Routes>
        
    </div>
  )  
}

export default AdminRoutes