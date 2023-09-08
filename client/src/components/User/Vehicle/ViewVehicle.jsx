import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../Header/Header';
import { Button } from '@mui/material';



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
    const location = useLocation()
    return (
        <div>
            <Header />
            <div className="details-container p-4 flex items-center justify-center">
                <div className="image-container w-auto">
                    <img src={location.state.images} alt="" />
                    <div className="">
                        <h5>Rent (per day)</h5>
                        <h5>Rs : {location.state.rent}</h5>
                    </div>
                </div>
                <div className="specifications border w-auto object-contain h-auto">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 600 }} aria-label="customized table">

                            <TableBody>

                                <StyledTableRow>
                                    <StyledTableCell align="center">Vehicle name</StyledTableCell>
                                    <StyledTableCell align="center">{location.state.vehicleName}</StyledTableCell>
                                </StyledTableRow>

                                <StyledTableRow>
                                    <StyledTableCell align="center">Brand</StyledTableCell>
                                    <StyledTableCell align="center">{location.state.brand}</StyledTableCell>
                                </StyledTableRow>

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
                <div className="">
                    <Button variant='outlined'> Book now</Button>
                </div>
        </div>
    )
}

export default ViewVehicle