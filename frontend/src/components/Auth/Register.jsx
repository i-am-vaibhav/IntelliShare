import { useState } from 'react';
import { TextField, Button, Snackbar, Typography, Paper, Box, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { PersonAdd as PersonAddIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { registerUser } from '../../api';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [preferences, setPreferences] = useState('');
  const [learningStyle, setLearningStyle] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await registerUser({ userName, password, preferences, learningStyle });
      setAlert({ open: true, message: response.data.message });
      
      // Clear the input fields after successful registration
      setUserName('');
      setPassword('');
      setPreferences('');
      setLearningStyle('');
      
      // Automatically navigate to login after a delay
      setTimeout(() => {
        navigator('/login');
      }, 500); 
    } catch (error) {
      setAlert({ open: true, message: error.response?.data?.message || 'Registration failed' });
    } finally {
      setIsLoading(false);
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
          <PersonAddIcon fontSize="large" color="primary" />
          <Typography variant="h5" component="h1" sx={{ marginLeft: '10px' }}>
            Create an Account
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
          <TextField
            variant="outlined"
            label="Preferences"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            required
            fullWidth
            sx={{ marginBottom: '30px' }}
          />
          <TextField
            variant="outlined"
            label="Learning Style"
            value={learningStyle}
            onChange={(e) => setLearningStyle(e.target.value)}
            required
            fullWidth
            sx={{ marginBottom: '30px' }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ padding: '10px', position: 'relative' }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ marginTop: '20px' }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>

        <Typography variant="body2" align="center" sx={{ marginTop: '10px' }}>
          Back to <Link to="/">Home</Link>
        </Typography>

        <Snackbar
          open={alert.open}
          autoHideDuration={6000}
          onClose={() => setAlert({ open: false, message: '' })}
          message={alert.message}
        />
      </Paper>
    </Box>
  );
};

export default Register;