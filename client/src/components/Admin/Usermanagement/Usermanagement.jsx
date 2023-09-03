import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import UserTable from './UserTable'



function Usermanagement() {

  
  return (
    <div>
        <>
        <Sidebar/>
        </>
        <div style={{marginLeft:"5rem",marginRight:"1rem"}}>
        <UserTable/>

        </div>

    </div>
  )
}

export default Usermanagement