import React, { useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import BookingTable from './BookingTable/BookingTable'

function Bookings() {
  useEffect(()=>{
  })

  return (
    <div>
        <Sidebar/>
        <div className="">
          <BookingTable/>
        </div>
    </div>
  )
}

export default Bookings