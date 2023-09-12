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

export default function FilterModal({value}) {
    console.log(value,'va');
  const [open, setOpen] = React.useState({value});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
     <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
               Class
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
               Body type
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
               fuel type
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
               Transmission
              </Typography>
              <div className="d-flex justify-center pt-5">
                <Button  variant="outlined" onClick={handleClose}>Apply</Button>
              </div>
            </Box>
          </Modal>
    </>
  );
}