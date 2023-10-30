
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { filterElements } from '../../Api/UserApi';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FilterModal({ value,handleFilter, setShowModal, categories }) {

  const handleFilterData = () => {
    if(data){
      handleFilter(data)
    }
    setShowModal(false)
  }
  const [data,setData]=useState({}) 
  const setValue=(e,item)=>{
    setData({...data,[item]:e.target.value})
  }

  return (
    <>
      <Modal
        open={value}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <h3 className="text-center pb-2 border-b-2" >Filter</h3>
          <div className=" flex">
            {
              categories.map((item) => (
                <FormControl key={item._id} variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel key={item._id} id="demo-simple-select-standard-label">{item.name}</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    key={item._id}
                    onChange={(e)=>setValue(e,item.name)}
                    value={data[item.name]}
                    label="Age"
                  >
                    {
                      item.items.map((elem)=>(

                        <MenuItem value={elem}>{elem}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              ))
            }
          </div>
          <div className="d-flex justify-center pt-5">
            <Button variant="outlined" onClick={handleFilterData}>Apply</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}