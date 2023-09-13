import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { Button, TextField } from '@mui/material'
import { useLocation } from 'react-router-dom'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

function Checkout() {
  const location = useLocation()
  const [noOfDays, setNoOfDays] = useState()
  const [total, setTotal] = useState()

  useEffect(() => {
    const start = new Date(location.state.checkIn)
    const end = new Date(location.state.checkOut)
    const timeDifference = end.getTime() - start.getTime()
    setNoOfDays(Math.floor(timeDifference / (1000 * 60 * 60 * 24)))
    setTotal(noOfDays * location.state.vehicle.rent)
  })
  console.log(noOfDays, "hello")

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center md:flex-row h-auto">
        <div className=" flex justify-center md:ml-5  md:w-1/2 px-4 py-6">
          <form action="" className="space-y-4 w-3/4 border shadow-sm border-blue-100 p-5">
            <h2 className="text-xl font-semibold mb-4">Add License</h2>
            <div className="mb-3">
              <label className="text-base font-semibold" htmlFor="licenseFile">
                Upload License File
              </label>
              <input
                required
                type="file"
                accept="image/*"
                id="licenseFile"
                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-3">
              <label className="text-base font-semibold" htmlFor="licenseNumber">
                License Number
              </label>
              <input
                required
                type="number"
                id="licenseNumber"
                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="License Number"
              />
            </div>
            <div className="mb-2">
              <h2 className="text-xl font-semibold">Add ID Card</h2>
            </div>
            <div className="mb-3">
              <label className="text-base font-semibold" htmlFor="idType">
                ID Type
              </label>
              <input
                required
                type="text"
                id="idType"
                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="ID Type"
              />
            </div>
            <div className="mb-3">
              <label className="text-base font-semibold" htmlFor="idNumber">
                ID Number
              </label>
              <input
                required
                type="number"
                id="idNumber"
                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                placeholder="ID Number"
              />
            </div>
            <div className="mb-3">
              <label className="text-base font-semibold" htmlFor="idImage">
                Upload ID Image
              </label>
              <input
                required
                type="file"
                accept="image/*"
                id="idImage"
                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800 text-sm"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2 p-5 flex flex-col justify-center items-center">
          <div className="w-96 m-5 p-5 h-auto flex flex-col gap-3 shadow-md rounded-md border-2 border-blue-100">
            <h3 className='pb-2 text-xl flex items-center'><DirectionsCarIcon className="mr-2" /> {location.state.vehicle.vehicleName}</h3>
            <div className="">
              <h5 className='pb-2 text-lg'>Rental Period</h5>
              <div className='pl-2 flex gap-2'>
                <span className='border rounded-md p-1'>{location.state.checkIn}</span>
                <span className='border-2 border-red-400 rounded-md p-1 bg-red-200'>{location.state.checkOut}</span>
              </div>
            </div>
            <p className="text-lg">No of days: {noOfDays}</p>
            <p className="text-lg">Rent (per day): {location.state.vehicle.rent}</p>
            <p className="text-xl font-semibold">Total: {total}</p>
          </div>
          <div className="flex justify-center">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              Proceed
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Checkout