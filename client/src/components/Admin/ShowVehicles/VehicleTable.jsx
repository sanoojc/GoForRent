import './VehicleTable.css'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button,TextField} from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axiosInstance from '../../../axios/axios';
import { listVehicle } from '../../../Api/AdminApi';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


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
export default function VehicleTable() {
  const navigate=useNavigate()
  const [vehicles, setVehicles] = useState([]);
  const [refreshPage, setRefresh] = useState(true)

  async function handleBan(id) {
    try {
      const result = await Swal.fire({
        text: `Are you sure you want to ban this user?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      });
      if (result.isConfirmed) {
        const { data } = await listVehicle(id);
        if(!data.error){
          toast.success(data.message)
          setRefresh(!refreshPage);
        }else{
          toast.error(data.error)
        }
      }
    } catch (error) {
      console.error('Error banning user:', error);
    }
  }

  const[name,setName]=useState('')

  useEffect(() => {
    async function fetchData() {
      try { 
        const { data } = await axiosInstance('adminToken').get(`/admin/vehicles?name=${name}`);
        setVehicles(data.vehicles);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchData();
  }, [name,refreshPage]);
  return (
    <>
      <div className="search" style={{ paddingLeft: '10px', paddingBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <TextField id="outlined-basic" label="search" variant="outlined" size='small' value={name} onChange={(e) => setName(e.target.value)} /><Button color='secondary' variant='outlined' size='medium' onClick={(e) => searchUser}>Search</Button>

      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="left"> Image</StyledTableCell>
              <StyledTableCell align="left"> Name</StyledTableCell>
              <StyledTableCell align="left">Brand</StyledTableCell>
              <StyledTableCell align="left">Rent</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
              <StyledTableCell align="left">Edit</StyledTableCell>
              <StyledTableCell align="left">View</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle, i) => (
              <StyledTableRow key={vehicle._id}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
                </StyledTableCell>
                <div className="table-vehicle-img">
                <img align="right" src={vehicle.images}/>

                </div>
                <StyledTableCell align="left">{vehicle.vehicleName}</StyledTableCell>
                <StyledTableCell align="left">{vehicle.brand}</StyledTableCell>
                <StyledTableCell align="left">{vehicle.rent}</StyledTableCell>
                <StyledTableCell align="left">
                  {
                      vehicle.list ? <Button onClick={(e) => handleBan(vehicle._id)} variant="contained" color="error">
                      unlist
                    </Button> : <Button onClick={(e) => handleBan(vehicle._id)} variant="outlined" color="success">
                      list
                    </Button>

                  }
                </StyledTableCell>
                <StyledTableCell align="left"><Button color="primary" onClick={()=>navigate('/admin/vehicleDetails',{state:vehicle})}>Edit</Button></StyledTableCell>
                <StyledTableCell align="left"><Button color="secondary" onClick={()=>navigate('/admin/vehicleDetails',{state:vehicle})}>view</Button></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
