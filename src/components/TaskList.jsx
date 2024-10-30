import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, TextField, Box } from '@mui/material';
import { motion } from 'framer-motion';
import api from '../api';
import './styles.css';

const TaskList = ({ tasks, setTasks }) => {
  const [editTaskId, setEditTaskId] = useState(null); // Track which task is being edited
  const [editedTasks, setEditedTasks] = useState({}); // Object to hold editing values for each task

  // Handle delete task
  const handleDelete = async (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    try {
      if (navigator.onLine) {
        await api.delete(`/tasks/${taskId}`);
      } else {
        console.log('Task deletion will be synced when back online');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Handle edit task
  const handleEdit = async (taskId) => {
    const updatedTask = editedTasks[taskId] || {}; // Get the edited values

    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    try {
      if (navigator.onLine) {
        await api.put(`/tasks/${taskId}`, updatedTask);
      } else {
        console.log('Task editing will be synced when back online');
      }
    } catch (error) {
      console.error('Error editing task:', error);
    }

    // Reset the edit state
    setEditTaskId(null);
    setEditedTasks((prev) => ({ ...prev, [taskId]: undefined })); // Clear editing state for this task
  };

  return (
    <Grid container spacing={2}>
      {tasks.map((task) => (
        <Grid item xs={12} sm={6} md={4} key={task.id}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="card">
              <CardContent>
                {editTaskId === task.id ? (
                  <Box component="form" onSubmit={(e) => { e.preventDefault(); handleEdit(task.id); }}>
                    <TextField
                      label="Title"
                      value={editedTasks[task.id]?.title || task.title} // Individual state for editing
                      onChange={(e) => setEditedTasks(prev => ({
                        ...prev,
                        [task.id]: { ...prev[task.id], title: e.target.value }
                      }))} // Update individual task title in local editing state
                      fullWidth
                      margin="normal"
                      sx={{ fontFamily: 'Caveat, cursive' }}
                    />
                    <TextField
                      label="Description"
                      value={editedTasks[task.id]?.description || task.description} // Individual state for editing
                      onChange={(e) => setEditedTasks(prev => ({
                        ...prev,
                        [task.id]: { ...prev[task.id], description: e.target.value }
                      }))} // Update individual task description in local editing state
                      fullWidth
                      margin="normal"
                      sx={{ fontFamily: 'Caveat, cursive' }}
                    />
                    <Box mt={2}>
                      <Button variant="contained" color="primary" type="submit" sx={{ mr: 1, fontFamily: 'Caveat, cursive' }}>
                        Save
                      </Button>
                      <Button variant="outlined" color="secondary" onClick={() => {
                        setEditTaskId(null);
                        setEditedTasks((prev) => ({ ...prev, [task.id]: undefined })); // Clear editing state for this task
                      }} sx={{ mr: 1, fontFamily: 'Caveat, cursive' }}>
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <>
                    <Typography variant="h6" sx={{ mt: 1, fontFamily: 'Caveat, cursive' }}>{task.title}</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'Caveat, cursive' }}>
                      {task.description}
                    </Typography>
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setEditTaskId(task.id);
                          setEditedTasks((prev) => ({
                            ...prev,
                            [task.id]: { title: task.title, description: task.description }
                          })); // Load the current title and description into editing state
                        }}
                        sx={{ mr: 2, fontFamily: 'Caveat, cursive' }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(task.id)}
                        sx={{ mr: 1, fontFamily: 'Caveat, cursive' }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskList;
