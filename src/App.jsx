import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { io } from 'socket.io-client';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import FloatingAddButton from './components/FloatingAddButton';
import theme from './theme';
import api from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const socket = io(process.env.REACT_APP_API_URL);

  useEffect(() => {
    // Fetch tasks
    api.get('/tasks').then((res) => setTasks(res.data));

    // Real-time listeners
    socket.on('new-task', (task) => setTasks((prev) => [...prev, task]));
    socket.on('update-task', (updatedTask) => {
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    });
    socket.on('delete-task', (id) =>
      setTasks((prev) => prev.filter((task) => task.id !== id))
    );

    return () => socket.disconnect();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ pt: 5 }}>
        <Typography variant="h4" gutterBottom align="center">
          The Best Greatest To-Do List App , Enjoy!!  
        </Typography>

        <TaskList tasks={tasks} />
        <FloatingAddButton setTasks={setTasks} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
