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
        <div className="flex justify-center pb-5 text-slate-500">
          <h2>USERS</h2>
        </div>
        <UserTable/>

        </div>

    </div>
  )
}

export default Usermanagement