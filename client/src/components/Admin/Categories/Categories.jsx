import { React, useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../../../Api/AdminApi';
import toast from 'react-hot-toast';
import ViewCategory from './ViewCategory';

function Categories() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [value, setValue] = useState();
  useEffect(() => {
    const fetchData = async () => {
      let { data } = await getCategories()
      if (data.error) {
        toast.error(data.message)
      } else {
        setValue(data.categories[0])
        setItems(data.categories)
      }
    }
    fetchData()
  }, [])
  const handleChange = (e) => {
    const valueDetails = items.filter((item) => item.name == e.target.value)
    console.log(valueDetails)
    setValue(valueDetails);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '##a4afb0',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return (
    <div>
      <Sidebar />
      <div className="pl-10 ml-10">
        <div className="flex justify-center pb-5 text-slate-500">
          <h2>CATEGORIES</h2>
        </div>
        <div className="flex justify-around">
          <div className=" flex items-start gap-4 mt-20">
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
                    items.map((item, index) => (
                      <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Box>
            <div className=" flex items-center">
              <div className="">
            <Button variant='contained' size='large'  onClick={() => navigate('/admin/addCategory')}>Add Category</Button>
              </div>
            </div>
          </div>
          <div className=" flex items-start">
            <ViewCategory category={value} />
          </div>
        </div>

      </div>

    </div>
  )
}

export default Categories



