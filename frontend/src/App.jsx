import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import UploadContent from './components/Content/UploadContent';
import ContentList from './components/Content/ContentList';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/LandingPage';
import HomeLayout from './components/HomeLayout';

const theme = createTheme({
  palette : {
    primary:{
      main : '#1976d2',
    },
    secondary:{
      main: '#dc004e',
    }
  }
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
          <Route path="/" element={<LandingPage></LandingPage>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={ <Login onLogin={handleLogin}/>} />
          <Route path="/intelli-share" element={<ProtectedRoute><HomeLayout/></ProtectedRoute>}>
            <Route path="/intelli-share/upload" 
                    element={ 
                      <ProtectedRoute>
                        <UploadContent></UploadContent>
                      </ProtectedRoute> 
                  } />
            <Route index path="/intelli-share/recommendations" 
                    element={ 
                      <ProtectedRoute>
                        <ContentList></ContentList>
                      </ProtectedRoute> 
                  } />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
