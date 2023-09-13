import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Button, Paper, Stack } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function Categories() {
  const navigate=useNavigate()
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  
  return (
    <div>
        <Sidebar/>
        <div className="pl-10 ml-10">
        <div>
          <Button onClick={()=>navigate('/admin/addCategory')}>Add</Button>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Item>Class</Item>
        <Item>Body type</Item>
        <Item>Fuel type</Item>
        <Item>Transmission type</Item>
      </Stack>
    </div>
        </div>
    </div>
  )
}

export default Categories