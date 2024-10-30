import React, { useState } from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddTaskModal from './AddTaskModal.jsx';

function FloatingAddButton({ setTasks }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: '#6200ea',
        }}
      >
        <AddIcon />
      </Fab>

      <AddTaskModal open={open} handleClose={handleClose} setTasks={setTasks} />
    </>
  );
}

export default FloatingAddButton;
