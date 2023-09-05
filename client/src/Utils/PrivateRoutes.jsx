import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function PrivateRoutes({role,route}) {
    const [auth,setAuth]=useState(null)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    useEffect(()=>{
        if(role==="user"){

        }else if(role==="admin"){
            
        }
    })
  return (
    <div>

    </div>
  )
}

export default PrivateRoutes