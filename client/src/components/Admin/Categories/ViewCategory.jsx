import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, tableCellClasses } from '@mui/material'
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
function ViewCategory({CategoryName}) {
    console.log(CategoryName,'categoryName')

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

  const navigate=useNavigate()
  const [vehicles, setVehicles] = useState([]);
  const [refreshPage, setRefresh] = useState(true)

  async function handleBan(id) {
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
        const { data } = await getCategoryItems(id);
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
        const { data } = await axiosInstance('adminToken').get(`/admin/viewCategory?name=${name}`);
        setVehicles(data.vehicles);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchData();
  }, [name,refreshPage]);

  return (
    <div>
      <Sidebar/>
        <div className="">
        <TextField id="outlined-basic" label="search" variant="outlined" size='small' value={name} onChange={(e) => setName(e.target.value)} /><Button color='secondary' variant='outlined' size='medium' onClick={(e) => searchUser}>Search</Button>
        </div>
        <div className="">
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="left"> Image</StyledTableCell>
              <StyledTableCell align="left"> Name</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
              <StyledTableCell align="left">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              vehicles.map((vehicle, i) => (
              <StyledTableRow key={vehicle._id}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
                </StyledTableCell>
                <div className="table-vehicle-img">
                <img align="right" src={vehicle.images}/>
                </div>
                <StyledTableCell align="left">{vehicle.vehicleName}</StyledTableCell>
                <StyledTableCell align="left">
                  {
                      vehicle.list ? <Button onClick={(e) => handleBan(vehicle._id)} variant="contained" color="error">
                      unlist
                    </Button> : <Button onClick={(e) => handleBan(vehicle._id)} variant="outlined" color="success">
                      list
                    </Button>
                  }
                </StyledTableCell>
                <StyledTableCell align="left"><Button color="primary" onClick={()=>navigate('/admin/editVehicle',{state:vehicle})}>Edit</Button></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  )
}

export default ViewCategory