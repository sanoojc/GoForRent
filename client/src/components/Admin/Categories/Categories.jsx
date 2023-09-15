import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Box, Button, Card, CardContent, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { getCategories } from '../../../Api/AdminApi';
import toast from 'react-hot-toast';

function Categories() {
  const navigate = useNavigate()
  const [items,setItems]=useState([])
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  useEffect(()=>{
    const fetchData=async()=>{
      let {data}=await getCategories()
      if(data.error){
        toast.error(data.message)
      }else{
        setItems(data.Categories)
      }
    }
    fetchData()
  })

  return (
    <div>
      <Sidebar />
      <div className="pl-10 ml-10">
        <div>
          <Button onClick={() => navigate('/admin/addCategory')}>Add</Button>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Card sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    Class
                  </Typography>
                </CardContent>
              </Box>
            </Card>
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