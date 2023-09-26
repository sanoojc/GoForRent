import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { filterElements } from '../../Api/UserApi';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FilterModal({value,setShowModal}) {
  const [categories,setCategories]=useState([])
  const [filterDetails,setFilterDetails]=useState()
    useEffect(()=>{
      (async()=>{
        const {data}=await filterElements()
        if(!data.error){
          console.log(data.categories,'categories')
          setCategories(data.categories)
        }
      })()
    },[])
    const handleFilter=()=>{

      setShowModal(false)
    }


  return (
    <>
     <Modal
            open={value}
            onClose={()=>setShowModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
             {
               categories.map((item)=>{
                 <FormControl key={item._id} variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <p>hiii</p>
                <InputLabel id="demo-simple-select-standard-label">{item.name}</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={item.name}
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
              })
            }
              <div className="d-flex justify-center pt-5">
                <Button  variant="outlined" onClick={handleFilter}>Apply</Button>
              </div>
            </Box>
          </Modal>
    </>
  );
}