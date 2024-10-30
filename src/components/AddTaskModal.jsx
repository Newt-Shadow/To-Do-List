// AddTaskModal.js
import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import api from '../api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AddTaskModal = ({ open, handleClose, setTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!title.trim() || !description.trim()) {
      alert("Title and Description are required");
      return;
    }

    try {
      const response = await api.post('/tasks', { title, description });
      setTasks((prev) => [...prev, response.data]); // Add new task to the existing tasks
      handleClose(); // Close the modal
      setTitle(''); // Clear the inputs
      setDescription('');
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task. Please try again.');
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ fontFamily: 'Caveat, cursive' }}>
          Add a New Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            required
            sx={{ fontFamily: 'Caveat, cursive' }} // Apply font style
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            required
            sx={{ fontFamily: 'Caveat, cursive' }} // Apply font style
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"  
            sx={{ fontFamily: 'Caveat, cursive' }} // Apply font style
          >
            Add Task
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddTaskModal;
