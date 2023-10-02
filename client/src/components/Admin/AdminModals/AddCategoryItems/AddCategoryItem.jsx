import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

export default function AddCategoryItems({ open, handleClose }) {


  return (
    <div className='rounded-md'>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className=" flex flex-col gap-4 items-center">
            <Typography id="modal-modal-title" variant="h5" component="h1">
              ADD ITEMS
            </Typography>
            <input placeholder='ADD....' className='w-full border pl-2 pt-2 border-black rounded-md my-2' type="text" />
            <button  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              ADD ITEM
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
