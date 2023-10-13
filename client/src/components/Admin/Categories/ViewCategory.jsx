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

function ViewCategory({ category }) {

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

  const navigate = useNavigate()
  const [items, setItems] = useState([]);
  const [refreshPage, setRefresh] = useState(true)
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axiosInstance('adminToken').get(`/admin/viewCategory?id=${category[0]._id}`);
        setItems(data.category.items);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchData();
  }, [category, refreshPage]);

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
        if (!data.error) {
          toast.success(data.message)
          setRefresh(!refreshPage);
        } else {
          toast.error(data.error)
        }
      }
    } catch (error) {
      console.error('Error banning user:', error);
    }
  }

  return (
    <div>
      <div className="pr-4 flex gap-4">
        <div className="max-w-xl">
        <div className="flex items-center justify-end pb-5">
          <div className="">
          <Button variant='outlined' size='large' onClick={handleOpen}>Add Item</Button>
          </div>
        </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell key='no' align='center' >No</StyledTableCell>
                  <StyledTableCell key='item' align="center"> Items</StyledTableCell>

                  <StyledTableCell key='action' align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  items.map((item, i) => (
                    <StyledTableRow key={item._id}>
                      <StyledTableCell align='center' component="th" scope="row">
                        {i + 1}
                      </StyledTableCell>

                      <StyledTableCell align="center">{item}</StyledTableCell>
                      <StyledTableCell align="center"><Button color="primary">Delete</Button></StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <AddCategoryItems category={category} open={openModal} handleClose={handleClose} refresh={() => setRefresh(!refreshPage)} />
    </div>
  )
}

export default ViewCategory