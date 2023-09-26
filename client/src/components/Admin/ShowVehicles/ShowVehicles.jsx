import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import VehicleTable from './VehicleTable'

function ShowVehicles() {
  const navigate=useNavigate()

  return (
    <div>
        <Sidebar/>
        <div className="pb-5" style={{marginLeft:"5rem",marginRight:"1rem"}}>
          <div className="flex justify-end">
        <Button variant="outlined" onClick={()=>navigate('/admin/addVehicle')}>Add vehicle</Button>
          </div>
        <>
        <VehicleTable/>
        </>
        </div>
    </div>
  )
}

export default ShowVehicles