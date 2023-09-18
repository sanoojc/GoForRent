
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Header from '../Header/Header';
import toast, { Toaster } from 'react-hot-toast';

function ViewVehicle() {
    const navigate = useNavigate()
    const [checkIn, setCheckin] = useState()
    const [checkOut, setCheckOut] = useState()
    const handleCheckIn = (e) => setCheckin(e.target.value)
    const handleCheckOut = (e) => setCheckOut(e.target.value)
    const location = useLocation()
    const handleProceed = () => {
        if (checkIn && checkOut) {
            const vehicle = location.state
            navigate('/checkout', { state: { vehicle: vehicle, checkIn: checkIn, checkOut: checkOut } })
        }else{
            toast.error('Select the dates')
        }
    }
    return (
        <div className='w-full'>
            <Toaster/>
            <Header />
            <div className="details-container p-4 flex flex-col items-center justify-center sm:flex-row">
                <div className="image-container w-full sm:w-1/2 object-fill">
                    <img src={location.state.images} alt="" />
                    <div className="pl-10 ml-10">
                        <div className="p-1">
                            <h1>{location.state.brand}  {location.state.vehicleName}</h1>
                        </div>
                        <div className="pl-3">
                            <h5>Rent (per day) <CurrencyRupeeIcon /> {location.state.rent} </h5>
                        </div>
                    </div>
                </div>
                <div className="specifications  w-full sm:w-auto object-fill h-auto">
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">

                            <TableBody>
                                <TableRow>
                                    <TableCell align="left">Year</TableCell>
                                    <TableCell align="left">{location.state.year}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">Fuel type</TableCell>
                                    <TableCell align="left">{location.state.fuelType}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell align="left">Seat capacity</TableCell>
                                    <TableCell align="left">{location.state.noOfSeats}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell align="left">Location</TableCell>
                                    <TableCell align="left">{location.state.hubId}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell align="left">Body type</TableCell>
                                    <TableCell align="left">{location.state.bodyType}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className=" flex flex-col sm:flex-row justify-center items-center gap-3 mt-5 w-full ">
                        <div className="flex flex-col border sm:flex-row sm:border-0 sm:border-transparent max-w-full items-center gap-1  p-2 rounded-md">
                            <div className="flex flex-col gap-2 items-start sm:flex-row sm:gap-3 ">
                                <p>From:</p>
                                <input className='border rounded-md' type='date' min={new Date().toISOString().split('T')[0]} onChange={handleCheckIn}></input>
                            </div>
                            <div className="flex flex-col gap-2 items-start sm:flex-row sm:gap-3  ">
                                <p>To:</p>
                                <input className='border rounded-md' type='date' min={checkIn} onChange={handleCheckOut}></input>
                            </div>


                        </div>
                        <div className="flex items-center justify-center">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleProceed}>
                            Book now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewVehicle