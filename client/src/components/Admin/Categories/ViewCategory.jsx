import * as React from 'react';
import { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, tableCellClasses } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../../../axios/axios';
import AddCategoryItems from '../AdminModals/AddCategoryItems/AddCategoryItem';
import { getCategoryItems } from '../../../Api/AdminApi';

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
    const [items, setItems] = useState([]);
    const [refreshPage, setRefresh] = useState(true)
    const[name,setName]=useState('')
    const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

    useEffect(() => {
      async function fetchData() {
        try { 
          const { data } = await axiosInstance('adminToken').get(`/admin/viewCategory?name=${CategoryName}`);
          setItems(data.category.items);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
      fetchData();
    }, [name,refreshPage]);

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
  const handleAddCategoryItem=async()=>{

  }

 

  return (
    <div>
      <Sidebar/>
        <div className="pr-4">
          <div className="flex justify-end pb-4 pr-3">
          <Button variant='outlined'onClick={handleOpen}>Add Item</Button>
          </div>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="left"> Image</StyledTableCell>
              <StyledTableCell align="left"> Name</StyledTableCell>
              <StyledTableCell align="left">Edit</StyledTableCell>
              <StyledTableCell align="left">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              items.map((item, i) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
                </StyledTableCell>
                <div className="table-vehicle-img">
                <img align="right" src={item.images}/>
                </div>
                <StyledTableCell align="left">{item.vehicleName}</StyledTableCell>
                <StyledTableCell align="left">
                  {
                      item.list ? <Button onClick={(e) => handleBan(item._id)} variant="contained" color="error">
                      unlist
                    </Button> : <Button onClick={(e) => handleBan(vehicle._id)} variant="outlined" color="success">
                      list
                    </Button>
                  }
                </StyledTableCell>
                <StyledTableCell align="left"><Button color="primary" onClick={()=>navigate('/admin/editVehicle',{state:item})}>Edit</Button></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddCategoryItems open={openModal} handleClose={handleClose} />
      </div>
    </div>
  )
}

export default ViewCategory