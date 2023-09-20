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
import {Button,TextField} from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axiosInstance from '../../../axios/axios';
import { listBooking } from '../../../../Api/AdminApi';

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
        setBookings(data.bookings);
      } catch (error) {
        console.error('Error fetching hub:', error);
      }
    }
    fetchData();
  }, [refreshPage,name]);
  return (
    <>
      <div className="search " style={{ paddingLeft: '10px', paddingBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <TextField id="outlined-basic" label="search" variant="outlined" size='small' value={name} onChange={(e) => setName(e.target.value)} />
        <Button color='secondary' variant='outlined' size='medium'>Search</Button>
      </div> 
      {
        hubs.length>=0?
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="right">Hub name</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
              <StyledTableCell align="right">View</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((hub, i) => (
              <StyledTableRow key={hub._id}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
                </StyledTableCell>
                <StyledTableCell align="right">{hub.hubName}</StyledTableCell>
                <StyledTableCell align="right">
                  {
                    hub.list ? <Button onClick={(e) => handleList(hub._id)} variant="contained" color="error">
                      unlist
                    </Button> : <Button onClick={(e) => handleList(hub._id)} variant="outlined" color="success">
                      list
                    </Button>

                  }
                </StyledTableCell>

                <StyledTableCell align="right"><Button color="secondary">view</Button></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>:'No datas found'
      }
    </>
  );
}
