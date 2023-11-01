import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import '../Dashboard/Dashboard.css'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function SalesReport() {
    const today=new Date().toLocaleDateString()
    console.log(today)
    const [from,setFrom]=useState(null)
    const [to,setTo]=useState(null)
    const handleFrom = (e) => 
    {
        setFrom(e.target.value)
        console.log(e.target.value)
    }
    const handleTo = (e) => setTo(e.target.value)
    const handleSubmit = async () => {

    }
    return (
        <div>
            <Sidebar />
            <div className="t=min-w-max mt-5 ml-28 mr-5 flex justify-evenly">
                <div className="w-72 h-36 border  border-slate-200  rounded-md text-slate-600 shadow-md shadow-slate-200 flex flex-col pt-3 gap-2 pl-16 justify-center items-start">
                    <h3>Bookings</h3>
                    <h2 className='flex gap-3 items-center'><span className='px-2.5 py-2 border rounded-full text-blue-400'><MenuBookIcon fontSize='50px' /></span>1</h2>
                </div>
                <div className="w-72 h-36 border  border-slate-200  rounded-md text-slate-600 shadow-md shadow-slate-200 flex flex-col pt-3 pl-16 justify-center items-start">
                    <h4>Revenue</h4>
                    <h2 className='flex gap-3 items-center'><span className='px-2.5 py-2 border rounded-full text-green-500'><CurrencyRupeeIcon fontSize='50px' /></span>2</h2>
                </div>
            </div>
            {/* Date filtering */}
            <div className=" flex justify-around items-center mt-5">
                <div className="border p-4">
                    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                        <div className="flex gap-3">

                            <div className='flex flex-col border-2 p-2 rounded-sm font-bold'>
                                <label  htmlFor="">From : </label>
                                <input max={to} onChange={handleFrom} className='border rounded-sm pl-1 pt-1' type="date" />
                            </div>
                            <div className='flex flex-col border-2 p-2 rounded-sm  font-bold'>
                                <label htmlFor="">To : </label>
                                <input min={from} max={today}  onChange={handleTo} className='border rounded-sm pl-1 pt-1' type="date" />
                            </div>
                        </div>
                        <div className=" flex justify-center mt-3">
                        <button  className='border w-full px-3 py-2 rounded-md bg-yellow-400 font-bold' type="submit" >Filter</button>
                        </div>
                    </form>
                </div>
                <div className=" sm:h-1/2 flex gap-3">
                    <>
                        <button className='border bg-yellow-400 text-black px-2 py-1 rounded-md shadow-md'>Download as PDF</button>
                    </>
                    <>
                        <button className='border bg-yellow-400 text-black px-2 py-1 rounded-md shadow-md'>Download as Excel</button>
                    </>
                </div>
            </div>
        </div>
    )
}

export default SalesReport