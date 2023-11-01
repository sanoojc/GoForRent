import React, { useEffect } from 'react'
import { Navigate, Route,Routes } from 'react-router-dom'
import Login from '../../components/Admin/Login/Login'
import { authenticateAdmin } from '../../Api/AdminApi';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from '../../components/Admin/Dashboard/Dashboard';
import Usermanagement from '../../components/Admin/Usermanagement/Usermanagement';
import ShowVehicles from '../../components/Admin/ShowVehicles/ShowVehicles';
import AddVehicle from '../../components/Admin/AddVehicle/AddVehicle';
import ViewVehicle from '../../components/Admin/ShowVehicles/ViewVehicle/ViewVehicle';
import Hubs from '../../components/Admin/Hubs/Hubs';
import Categories from '../../components/Admin/Categories/Categories';
import AddHub from '../../components/Admin/Hubs/AddHub';
import AddCategories from '../../components/Admin/Categories/AddCategories';
import ViewCategory from '../../components/Admin/Categories/ViewCategory';
import EditVehicle from '../../components/Admin/ShowVehicles/EditVehicle/EditVehicle';
import Bookings from '../../components/Admin/Bookings/Bookings';
import SalesReport from '../../components/Admin/SalesReport/SalesReport';



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
                <Route path='/' element={<Dashboard/>}/>
                <Route path='/login' element={<Navigate to={'/admin/Dashboard'} replace/> }/>
                <Route path='/Dashboard' element={<Dashboard/>}/>
                <Route path='/Users' element={<Usermanagement/>}></Route>
                <Route path='/Vehicles' element={<ShowVehicles/>}/>
                <Route path='/addvehicle' element={<AddVehicle/>}/>
                <Route path='/vehicleDetails' element={<ViewVehicle/>}/>
                <Route path='/editVehicle' element={<EditVehicle/>}/>
                <Route path='/Hubs' element={<Hubs/>}/>
                <Route path='/Categories' element={<Categories/>}/>
                <Route path='/Bookings' element={<Bookings/>}/>
                <Route path='/addHub' element={<AddHub/>}/>
                <Route path='/addCategory' element={<AddCategories/>}/>
                <Route path='/viewCategory' element={<ViewCategory/>}/>
                <Route path='/reports' element={<SalesReport/>}/>

              </>
          }
          {
            admin.login===false&&<>
            <Route path='/' element={<Navigate to={'/admin/login'}/>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/Dashboard' element={<Navigate to={'/admin/login'}/>}/>
            <Route path='/Users' element={<Navigate to={'/admin/login'}/>}/>
            <Route path='/addvehicle' element={<Navigate to={'/admin/login'}/>}/>
            <Route path='/Vehicles' element={<Navigate to={'/admin/login'}/>}/>
            <Route path='/Categories'  element={<Navigate to={'/admin/login'}/>}/>
            <Route path='/Bookings' element={<Navigate to={'/admin/login'}/>}/>
            <Route path='/addHub'  element={<Navigate to={'/admin/login'}/>}/>
            <Route path='/addCategory' element={<Navigate to={'/admin/login'}/>}/>
            <Route path='/viewCategory' element={<Navigate to={'/admin/login'}/>}/>
            </>
          }
        </Routes>
    </div>
  )  
}

export default AdminRoutes