// src/pages/Dashboard.js
import React from 'react';
import { Container, Typography } from '@mui/material';
import TaskList from '../components/TaskList';

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Tasks
      </Typography>
      <TaskList />
    </Container>
  );
};

export default Dashboard;
