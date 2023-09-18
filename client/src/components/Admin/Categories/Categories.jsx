import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Box, Button, Card, CardContent, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../../../Api/AdminApi';
import toast from 'react-hot-toast';

function Categories() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '##a4afb0',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await getCategories()
      console.log("databdjhjdfj", data.categories);
      if (data.error) {
        toast.error(data.message)
      } else {
        setItems(data.categories)
      }
    }
    fetchData()
  }, [])

  console.log("items", items);

  return (
    <div>
      <Sidebar />
      <div className="pl-10 ml-10">
        <div className='m-4 flex justify-end'>
          <Button variant='outlined' onClick={() => navigate('/admin/addCategory')}>Add Category</Button>
        </div>
        <div className="">
          <Stack 
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >{
              items && items.map((item, index) => (
                <Card onClick={()=>navigate('/admin/viewCategory',{state:item})} sx={{ display: 'flex' }} key={index}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '200px' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h5" sx={{ textAlign: 'center' }} >
                        {item.name}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>

                // <motion.div layoutId={item.id} onClick={() => setSelectedId(item.id)}>
                //   <motion.h5>{item.subtitle}</motion.h5>
                //   <motion.h2>{item.title}</motion.h2>
                // </motion.div>
              )
              )
            }
            {/* <AnimatePresence>
              {selectedId && (
                <motion.div layoutId={selectedId}>
                  <motion.h5>{item.subtitle}</motion.h5>
                  <motion.h2>{item.title}</motion.h2>
                  <motion.button onClick={() => setSelectedId(null)} />
                </motion.div>
              )}
            </AnimatePresence> */}

          </Stack>
        </div>
      </div>
    
    </div>
  )
}

export default Categories



