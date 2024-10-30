import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { io } from 'socket.io-client';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import FloatingAddButton from './components/FloatingAddButton';
import theme from './theme';
import api from './api';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from local storage and backend (if online)
  const fetchTasks = async () => {
    const localTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(localTasks);

    if (navigator.onLine) {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
        localStorage.setItem('tasks', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching tasks from backend:', error);
      }
    }
  };

  const syncTasks = async () => {
    const localTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    for (const task of localTasks) {
      if (!task.id && navigator.onLine) {
        try {
          const response = await api.post('/tasks', task);
          const updatedTasks = tasks.map((t) => (t === task ? { ...t, id: response.data.id } : t));
          setTasks(updatedTasks);
          localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        } catch (error) {
          console.error('Error syncing task to backend:', error);
        }
      }
    }
  };

  useEffect(() => {
    fetchTasks();
    window.addEventListener('online', syncTasks);

    const socket = io(process.env.REACT_APP_API_URL);
    socket.on('new-task', (task) => setTasks((prev) => [...prev, task]));
    socket.on('update-task', (updatedTask) => {
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    });
    socket.on('delete-task', (id) => setTasks((prev) => prev.filter((task) => task.id !== id)));

    return () => {
      socket.disconnect();
      window.removeEventListener('online', syncTasks);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container fluid className="p-5 bg-dark text-light" style={{ minHeight: '100vh' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Typography variant="h3" className="text-center" gutterBottom sx={{ fontFamily: 'Caveat, cursive' }}  >
            The Best Of The Best , The Greatest Of The Greatest 
          </Typography>
          <Typography variant="h3" className="text-center" gutterBottom sx={{ fontFamily: 'Caveat, cursive' }}  >
            Your To-Do-list Web App , Enjoyy!!
          </Typography>
        </motion.div>
        
        <Row className="justify-content-center mt-4">
          <Col md={6}>
            <AddTask setTasks={setTasks} />
          </Col>
        </Row>

        <Row className="justify-content-center mt-5">
          <Col md={8}>
            <TaskList tasks={tasks} setTasks={setTasks} />
          </Col>
        </Row>

        <FloatingAddButton setTasks={setTasks} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
