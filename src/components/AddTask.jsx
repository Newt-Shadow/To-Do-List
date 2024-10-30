import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { TextField } from '@mui/material';

const AddTask = ({ setTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = { title, description };
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setTasks(tasks);

    setTitle('');
    setDescription('');
  };

  return (
    <Card className="shadow-sm p-4 mb-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <TextField
            label="Task Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ fontFamily: 'Caveat, cursive' }} // Apply font style
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <TextField
            label="Task Description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ fontFamily: 'Caveat, cursive' }} // Apply font style
          />
        </Form.Group>
        <Button 
          variant="primary" 
          type="submit" 
          className="w-100" 
          sx={{ fontFamily: 'Caveat, cursive' }} // Apply font style to button
        >
          Add Task
        </Button>
      </Form>
    </Card>
  );
};

export default AddTask;
