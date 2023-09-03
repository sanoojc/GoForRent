import React, { useEffect } from 'react'
import { Navigate, Route,Routes } from 'react-router-dom'
import Login from '../../components/Admin/Login/Login'
import { authenticateAdmin } from '../../Api/AdminApi';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from '../../components/Admin/Dashboard/Dashboard';
import Usermanagement from '../../components/Admin/Usermanagement/Usermanagement';
import ShowVehicles from '../../components/Admin/ShowVehicles/ShowVehicles';
import AddVehicle from '../../components/Admin/AddVehicle/AddVehicle';



function AdminRoutes() {
  const {admin,refresh} = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  useEffect(()=>{
 (async function (){
    let { data:adminData } = await authenticateAdmin()
      dispatch({ type: "admin", payload: { login: adminData.login } })
  })()
  },[refresh])
  return (
    <div>
        <Routes>
              {admin.login&&<>
                <Route path='/login' element={<Navigate to={'/admin/Dashboard'} replace/> }/>
                <Route path='/Users' element={<Usermanagement/>}></Route>
                <Route path='/Dashboard' element={<Dashboard/>}/>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='/vehicles' element={<ShowVehicles/>}/>
                <Route path='/addvehicle' element={<AddVehicle/>}/>
              
              </>

          }
          {
            admin.login===false&&<>
            <Route path='/' element={<Login></Login>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/Dashboard' element={<Navigate to={'/admin/login'}/>}/>
            <Route path='/Users' element={<Navigate to={'/admin/login'}/>}/>
            
            </>
          }
          
        </Routes>
        
    </div>
  )  
}

export default AdminRoutes