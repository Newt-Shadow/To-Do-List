import { createTheme } from '@mui/material/styles';

// Custom Material UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea', // Deep purple
    },
    secondary: {
      main: '#03dac6', // Teal
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
      color: '#6200ea',
    },
    button: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          padding: '16px',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;
