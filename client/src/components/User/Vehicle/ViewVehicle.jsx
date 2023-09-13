import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Header from '../Header/Header';
import { Button, TextField } from '@mui/material';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function ViewVehicle() {
    const navigate=useNavigate()
    const [checkIn,setCheckin]=useState()
    const [checkOut,setCheckOut]=useState()
    const handleCheckIn=(e)=>setCheckin(e.target.value)
    const handleCheckOut=(e)=>setCheckOut(e.target.value)
    const location = useLocation()
    const handleProceed=()=>{
        const vehicle=location.state
        navigate('/checkout',{state:{vehicle:vehicle,checkIn:checkIn,checkOut:checkOut}})
    }
    return (
        <div>
            <Header />
            <div className="details-container p-4 flex items-center justify-center">
                <div className="image-container w-1/2 object-fill">
                    <img src={location.state.images} alt="" />
                    <div className="pl-10 ml-10">
                        <div className="p-1">
                            <h2>{location.state.brand}  {location.state.vehicleName}</h2>
                        </div>
                        <div className="pl-3">
                            <h5>Rent (per day) <CurrencyRupeeIcon />  {location.state.rent} </h5>
                        </div>
                    </div>
                </div>
                <div className="specifications border w-auto object-contain h-auto">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 600 }} aria-label="customized table">

                            <TableBody>
                                <StyledTableRow>
                                    <StyledTableCell align="center">Year</StyledTableCell>
                                    <StyledTableCell align="center">{location.state.year}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="center">Fuel type</StyledTableCell>
                                    <StyledTableCell align="center">{location.state.fuelType}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="center">Seat capacity</StyledTableCell>
                                    <StyledTableCell align="center">{location.state.noOfSeats}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="center">Location</StyledTableCell>
                                    <StyledTableCell align="center">{location.state.hubId}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="center">Body type</StyledTableCell>
                                    <StyledTableCell align="center">{location.state.bodyType}</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <div className=" d-flex justify-center mt-5">
                <div className="date-container d-flex p-5 flex-col gap-1 shadow-sm border rounded-md">
                    <p>From:</p>
                <input className='border rounded-md' type='date' min={new Date().toISOString().split('T')[0]} onChange={handleCheckIn}></input>
                <p>To:</p>
                <input className='border rounded-md' type='date' min={checkIn} onChange={handleCheckOut}></input>
                <div className="pt-3 pl-5">
                <Button variant='outlined' onClick={handleProceed}> Book now</Button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ViewVehicle