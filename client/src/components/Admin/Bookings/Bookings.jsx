import React, { useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import BookingTable from './BookingTable/BookingTable'

function Bookings() {
  useEffect(() => {
  })

  return (
    <div>
      <Sidebar />
      <div className="pl-20 pr-10">
        <div className="flex justify-center pb-5">
          <h2>BOOKINGS</h2>
        </div>
        <BookingTable />
      </div>
    </div>
  )
}

export default Bookings