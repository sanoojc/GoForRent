import {React, useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../../../Api/AdminApi';
import toast from 'react-hot-toast';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ViewCategory from './ViewCategory';

function Categories() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      let { data } = await getCategories()
      console.log(data.categories);
      if (data.error) {
        toast.error(data.message)
      } else {
        setItems(data.categories)
      }
    }
    fetchData()
  }, [])
  const [value, setValue] = useState(items[0]);
  const handleChange = (e) => {
    const valueDetails = items.filter((item) => item.name == e.target.value)
    setValue(valueDetails);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '##a4afb0',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  console.log("items", items);
  return (
    <div>
      <Sidebar />
      <div className="pl-10 ml-10">
      <div className="flex justify-center pb-5 text-slate-500">
          <h2>CATEGORIES</h2>
        </div>
        <div className=" flex justify-start gap-4">
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label='categories'
                onChange={handleChange}
              >
                {
                  items.map((item,index)=>(
                    <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                  ))
              }
              </Select>
            </FormControl>
          </Box>
          <Button variant='contained' onClick={() => navigate('/admin/addCategory')}>Add Category</Button>
        </div>
        <div className="">
          <ViewCategory CategoryName={value} />
        </div>
      </div>

    </div>
  )
}

export default Categories



