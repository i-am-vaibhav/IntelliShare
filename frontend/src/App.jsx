import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import UploadPost from './components/Content/UploadPost';
import ContentList from './components/Content/ContentList';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/LandingPage';
import HomeLayout from './components/HomeLayout';
import Posts from './components/Content/Posts';
import Profile from './components/User/Profile';
import HomePage from './components/HomePage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#424242', // Dark Grey
      light: '#6F6F6F', // Light Grey
      dark: '#1B1B1B', // Darker Grey
      contrastText: '#FFFFFF', // White text for contrast
    },
    secondary: {
      main: '#FFB300', // Bright Amber for a vibrant contrast
      light: '#FFE57F', // Light Amber
      dark: '#FF8F00', // Dark Amber
      contrastText: '#000000', // Black text for contrast
    },
    tertiary: {
      main: '#673AB7', // Purple
      light: '#9575CD', // Light Purple
      dark: '#45277A', // Dark Purple
      contrastText: '#FFFFFF', // White text for contrast
    },
    error: {
      main: '#f44336', // Red
    },
    success: {
      main: '#4caf50', // Green
    },
    warning: {
      main: '#ff9800', // Orange
    },
    info: {
      main: '#2196f3', // Blue
    },
    background: {
      default: '#F5F5F5', // Light background
      paper: '#FFFFFF', // White paper
    },
  },
  typography: {
    fontFamily: 'Arial, Open Sans',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.5,
    h1: {
      fontSize: '3rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary',
        size: 'medium',
        disableElevation: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
        size: 'small',
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 3,
        borderRadius: 8,
      },
    },
  },
});

const App = () => {

  const handleLogin = (id, newToken) => {
    // Store token and userId in localStorage
    localStorage.setItem('token', newToken);
    localStorage.setItem('userId', id);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={ <Login onLogin={handleLogin}/>} />
          <Route path="/intelli-share" element={<ProtectedRoute><HomeLayout/></ProtectedRoute>}>
            <Route index path="/intelli-share/" 
                    element={ 
                      <ProtectedRoute>
                        <HomePage/>
                      </ProtectedRoute> 
                  } />
            <Route path="/intelli-share/recommendations" 
                    element={ 
                      <ProtectedRoute>
                        <ContentList/>
                      </ProtectedRoute> 
                  } />
            <Route path="/intelli-share/upload" 
                    element={ 
                      <ProtectedRoute>
                        <UploadPost/>
                      </ProtectedRoute> 
                  } />
            <Route index path="/intelli-share/posts" 
                    element={ 
                      <ProtectedRoute>
                        <Posts/>
                      </ProtectedRoute> 
                  } />
            <Route index path="/intelli-share/profile" 
                    element={ 
                      <ProtectedRoute>
                        <Profile/>
                      </ProtectedRoute> 
                  } />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
