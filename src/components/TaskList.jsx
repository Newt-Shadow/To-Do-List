import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import api from '../api';  // Your API instance
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import './styles.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');  // Fetch tasks from backend
      setTasks(response.data);  // Set tasks in state
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Fetch tasks when component loads
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Grid container spacing={2}>
    {tasks.map((task) => (
      <Grid item xs={12} sm={6} md={4} key={task.id}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="card">  {/* Use custom card class */}
            <CardContent>
              <Typography variant="h6">{task.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {task.description}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Grid>
    ))}
  </Grid>
  );
};

export default TaskList;
