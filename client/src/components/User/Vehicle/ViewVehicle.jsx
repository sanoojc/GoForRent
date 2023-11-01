
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Header from '../Header/Header';
import toast, { Toaster } from 'react-hot-toast';
import Footer from '../Footer/Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchBookedDates } from '../../../Api/UserApi';


function ViewVehicle() {

    const navigate = useNavigate()
    const [checkIn, setCheckin] = useState(null)
    const [checkOut, setCheckOut] = useState(null)
    const [disableDays, setDisableDays] = useState([])
    const handleCheckIn = (date) => setCheckin(date)
    const handleCheckOut = (date) => setCheckOut(date)

    const location = useLocation()
    useEffect(() => {
        (async () => {
            const { data } = await fetchBookedDates(location.state._id)
            const dates = data.allDates.map((date) => new Date(date))
            setDisableDays([...dates])
        })()
    }, [])
    const today = new Date();
    const handleProceed = () => {
        if (checkIn && checkOut) {
            const vehicle = location.state
            navigate('/checkout', {
                state: {
                    vehicle: vehicle, checkIn: checkIn.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                    }), checkOut: checkOut.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                    })
                }
            })
        } else {
            toast.error('Select the dates')
        }
    }
    return (
        <div className='w-full'>
            <Toaster />
            <Header />
            <div className="details-container p-4 flex flex-col items-center justify-center sm:flex-row mb-10">
                <div className="image-container w-full sm:w-1/2 object-fill ">
                    <img src={location.state.images[0]} alt="" />
                    <div className="sm:pl-10 ml-10">
                        <div className="p-1">
                            <h1>{location.state.brand}  {location.state.vehicleName}</h1>
                        </div>
                        <div className=" flex flex-col items-center gap-2 sm:flex-row">
                            <h3 className='font-bold'>Rent</h3><h5> (Per Day) <CurrencyRupeeIcon /> {location.state.rent} </h5>
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
                    <div className="">
                        <div className="flex justify-center mt-5 mb-2">
                        <h3>Select the dates</h3>
                        </div>
                        <div className=" flex flex-col sm:flex-row justify-center items-center gap-3  w-full ">
                            <div className="flex flex-col sm:flex-row max-w-full items-center gap-1  p-2 ">
                                <div className="flex flex-col items-start sm:flex-row sm:gap-3 border pt-2 rounded-md px-2">
                                    <p>From:</p>
                                    <DatePicker placeholderText='dd/mm/yyyy'
                                        selected={checkIn}
                                        minDate={today}
                                        maxDate={checkOut}
                                        dateFormat="dd/MM/yyyy"
                                        excludeDates={disableDays}
                                        onChange={handleCheckIn} 
                                    />
                                    {/* <input className='outline-none' type='date' min={new Date().toISOString().split('T')[0]} defaultValue={'2023-10-06'} onChange={handleCheckIn}></input> */}
                                </div>
                                <div className="flex flex-col  items-start sm:flex-row sm:gap-3 pt-2  border rounded-md px-2 ">
                                    <p>To:</p>
                                    <DatePicker placeholderText='dd/mm/yyyy'
                                        selected={checkOut}
                                        minDate={checkIn}
                                        dateFormat="dd/MM/yyyy"
                                        excludeDates={disableDays}
                                        onChange={handleCheckOut}
                                    />
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
            <Footer />
        </div>
    )
}

export default ViewVehicle