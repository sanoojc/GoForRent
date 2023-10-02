import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import {Button,FormControl,InputLabel,MenuItem,Select,TextField} from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2'
import axiosInstance from "../../../../axios/axios"
import { changeBookingStatus, listBooking } from '../../../../Api/AdminApi';
import toast, { Toaster } from 'react-hot-toast';

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

export default function BookingTable() {
  const [bookings, setBookings] = useState([]);
  const [refreshPage, setRefresh] = useState(true)

  async function handleList(id) {
    try {
      const result = await Swal.fire({
        text: `Are you sure ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      });
      if (result.isConfirmed) {
        const { data } = await listBooking(id);
        console.log(data, 'ban');
        setRefresh(!refreshPage);
      }
    } catch (error) {
      console.error('Error banning user:', error);
    }
  }
  const[name,setName]=useState('')
  useEffect(() => {
    async function fetchData() {
      try { 
        const { data } = await axiosInstance('adminToken').get(`/admin/bookings?name=${name}`);
        console.log(data.bookings,'bookings')
        setBookings(data.bookings);
      } catch (error) {
        console.error('Error fetching hub:', error);
      }
    }
    fetchData();
  }, [refreshPage,name]);

  const handleBooking=async(e,id)=>{
    const {data}=await changeBookingStatus(id,e.target.value)
    if(!data.error){
      toast.success(data.message)
      setRefresh(!refreshPage)
    }else{
      toast.error(data.message)
    }
  }
  return (
    <div className=''>
      <Toaster/>
      <div className="search flex gap-2" style={{ paddingLeft: '10px', paddingBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <TextField id="outlined-basic" label="search" variant="outlined" size='small' value={name} onChange={(e) => setName(e.target.value)} />
        <Button color='secondary' variant='outlined' size='medium'>Search</Button>
      </div> 
      {
        bookings.length>=0?
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="left">Image</StyledTableCell>
              <StyledTableCell align="right">Vehicle name</StyledTableCell>
              <StyledTableCell align="right">User</StyledTableCell>
              <StyledTableCell align="right">From</StyledTableCell>
              <StyledTableCell align="right">To</StyledTableCell>
              <StyledTableCell align="right">Total</StyledTableCell>
              <StyledTableCell align="right">View</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((item, i) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
                </StyledTableCell>
                  <div className=" w-16 h-16 flex items-center object-contain">
                     <img src={item.vehicle.images[0]} alt="" /> 
                    </div>
                <StyledTableCell align="right">{item.vehicle.vehicleName}</StyledTableCell>
                <StyledTableCell align="right">{item.userId.name}</StyledTableCell>
                <StyledTableCell align="right">{new Date(item.fromDate).toISOString().split('T')[0]}</StyledTableCell>
                <StyledTableCell align="right">{new Date(item.toDate).toISOString().split('T')[0]}</StyledTableCell>
                <StyledTableCell align="right">{item.totalAmount}</StyledTableCell>
                <StyledTableCell align="right"><Button color="secondary">view</Button></StyledTableCell>
                <StyledTableCell align="right">
                <FormControl size='small' sx={{minWidth:'120px'}}>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select 
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item.paymentStatus}
          onChange={(e)=>handleBooking(e,item._id)}
        >
          <MenuItem value='Paid'>Paid</MenuItem>
          <MenuItem value='Cancelled'>Cancelled</MenuItem>
          <MenuItem value='completed'>Completed</MenuItem>
        </Select>
      </FormControl>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>:'No datas found'
      }
    </div>
  );
}
