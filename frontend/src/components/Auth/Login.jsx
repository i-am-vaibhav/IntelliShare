import React, { useState } from "react";
import { loginUser } from "../../api";
import { TextField, Button, Snackbar, Typography, Paper, Box, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { LockOpen as LockOpenIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);  // To toggle password visibility
  const [alert, setAlert] = useState({ open: false, message: '' });
  const [isLoading, setIsLoading] = useState(false);  // To show loading state
  const navigator = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await loginUser({ userName, password });
      setAlert({ open: true, message: 'Logged in successfully' });
      onLogin(response.data.userId, response.data.token);
      navigator("/intelli-share/");
    } catch (error) {
      setAlert({ open: true, message: error.response?.data?.message || 'Login failed' });
    } finally {
      setIsLoading(false);  // Stop loading after request finishes
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f6f8',
      }}
    >
      <Paper elevation={6} sx={{ padding: '40px', maxWidth: '400px' }}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
          <LockOpenIcon fontSize="large" color="primary" />
          <Typography variant="h5" component="h1" sx={{ marginLeft: '10px' }}>
            Login to IntelliShare
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            fullWidth
            sx={{ marginBottom: '30px' }}
            error={alert.message === 'Invalid username'}  // Error highlighting for invalid username
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            sx={{ marginBottom: '30px' }}
            error={alert.message === 'Invalid password'}  // Error highlighting for invalid password
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ padding: '10px', position: 'relative' }}
            disabled={isLoading}  // Disable button when loading
          >
            {isLoading ? <CircularProgress size={24} /> : 'Login'}  {/* Show spinner while loading */}
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ marginTop: '20px' }}>
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>

        <Typography variant="body2" align="center" sx={{ marginTop: '10px' }}>
          Back to <Link to="/">Home</Link>
        </Typography>

        <Snackbar
          open={alert.open}
          autoHideDuration={6000}
          onClose={() => setAlert({ ...alert, open: false })}
          message={alert.message}
        />
      </Paper>
    </Box>
  );
};

export default Login;