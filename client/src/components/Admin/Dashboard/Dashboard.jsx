import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './Dashboard.css'
import PeopleIcon from '@mui/icons-material/People';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { getDashboardData } from '../../../Api/AdminApi';
import { Link, useNavigate } from 'react-router-dom';
import BasicLineChart from '../Charts/BasicLineChart/BasicLineChart';
import BasicPieChart from '../Charts/BasicPieChart/BasicPieChart';


function Dashboard() {
  const [users,setUsers]=useState([])
  const [vehicles,setVehicles]=useState([])
  const [bookings,setBookings]=useState([])
  const [hubs,setHubs]=useState([])
  const navigate=useNavigate()
  useEffect(()=>{
    (async()=>{
      const {data}=await getDashboardData()
      if(!data.error){
        setUsers(data.users)
        setVehicles(data.vehicles)
        setBookings(data.bookings)
        setHubs(data.hubs)
      }
    })()
  },[])
  return (
    <div>
      <Sidebar/>
      <div className=" flex justify-center text-slate-500">
      <h2>DASHBOARD</h2>
      </div>
      <div className=" min-w-max mt-5 ml-28 mr-5 flex justify-evenly">
      <Link to={"/admin/Users"}>
        <div className="card-style">
          <h4>Users</h4>
          <h2 className='flex gap-3 items-center'><span className='px-2.5 py-2 border rounded-full text-blue-400'><PeopleIcon fontSize='50px'/></span>{users.length}</h2>
        </div>
      </Link>
        <Link to={'/admin/Vehicles'}>
        <div className="card-style">
          <h4>Vehicles</h4>
          <h2 className='flex gap-3 items-center'><span className='px-2.5 py-2 border rounded-full text-green-400'><DirectionsCarFilledIcon fontSize='50px'/></span>{vehicles.length}</h2>
        </div>
        </Link>
        <Link to={"/admin/Hubs"}>
        <div className="card-style">
          <h4>Hubs</h4>
          <h2 className='flex gap-3 items-center'><span className='px-2.5 py-2 border rounded-full text-red-400'><DeviceHubIcon fontSize='50px'/></span>{hubs.length}</h2>
        </div>
        </Link>
        <Link to={"/admin/Bookings"}>
        <div className="card-style">
          <h4>Bookings</h4>
          <h2 className='flex gap-3 items-center'><span className='px-2.5 py-2 border rounded-full text-orange-400'><MenuBookIcon fontSize='50px'/></span>{bookings.length}</h2>
          </div>
        </Link>
      </div>
      <div className="flex mt-5 items-center justify-around">
        <div className="">
      <BasicPieChart bookings={bookings}/>
        </div>
        <div className="">

      <BasicLineChart bookings={bookings}/>
        </div>
      </div>
        <div className="flex justify-center w-full my-4">
          <button onClick={()=>navigate("/admin/reports")} className='bg-blue-500 w-1/2 py-2 rounded-md text-white font-bold mx-5'>SALES REPORT</button>
        </div>
    </div>
  )
}

export default Dashboard