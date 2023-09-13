import React, { useEffect } from 'react'
import Header from '../Header/Header'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'

function Profile() {
  const {user}=useSelector((state)=>state)
  console.log(user,'profile page')
  useEffect(()=>{

  })
  return (
    <div>
      <Header />
    
      <section class="w-96  mx-auto mt-4 bg-[#fcfdff] rounded-2xl px-8 py-6 shadow-lg">
        <div class="mt-6 w-fit mx-auto">
          <img src={user.details.profile} class="rounded-full w-28 " alt="profile picture"  />
        </div>

        <div class="mt-8 ">
          <h5 class=" font-bold  tracking-wide">Name : {user.details.name}</h5>
        </div>
        <div class="mt-8 w-fit">
          <h5 class=" font-bold  tracking-wide">Email : {user.details.email}</h5>
        </div>{
          user.details.number&&
        <div class="mt-8 ">
          <h5 class=" font-bold text-2xl tracking-wide">Phone : {user.details.number}</h5>
        </div>
        }

        {/* <p class="text-emerald-400 font-semibold mt-2.5" >
          Active
        </p> */}

        {/* <div class="h-1 w-full bg-black mt-8 rounded-full">
          <div class="h-1 rounded-full w-2/5 bg-yellow-500 "></div>
        </div>
        <div class="mt-3 text-white text-sm">
          <span class="text-gray-400 font-semibold">Storage:</span>
          <span>40%</span>
        </div> */}
        <div className="d-flex justify-center p-4">
        <Button  variant='contained' color='error'>Edit</Button>
        </div>

      </section>

    </div>
  )
}

export default Profile