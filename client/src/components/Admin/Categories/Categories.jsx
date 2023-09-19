import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Box,Button,Paper } from '@mui/material'
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
      console.log( data.categories);
      if (data.error) {
        toast.error(data.message)
      } else {
        setItems(data.categories)
      }
    }
    fetchData()
  }, [])

  const [value, setValue] = useState(items[0]);

  const handleChange = (event, newValue) => {
    const valueDetails=items.filter((item)=>item.name==newValue)
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
        <div className='m-4 flex justify-end'>
          <Button variant='outlined' onClick={() => navigate('/admin/addCategory')}>Add Category</Button>
        </div>
        <div className=" flex justify-center">
          <Box className='w-full flex justify-center'>
          {
              items && items.map((item, index) => (
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab key={index} value={item.name} label={item.name} />
            </Tabs>
                ))
              }
          </Box>
        </div>
        <div className="">
              <ViewCategory CategoryName={value}/>
        </div>
      </div>

    </div>
  )
}

export default Categories



