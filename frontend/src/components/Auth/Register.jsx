import React, { useState } from 'react';
import { TextField, Button, Snackbar, Typography, Paper, Box } from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
import { registerUser } from '../../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [preferences, setPreferences] = useState('');
  const [learningStyle, setLearningStyle] = useState('');
  const [alert, setAlert] = useState({open:false,message:''});
  const navigator = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const response = await registerUser({userName, password, preferences, learningStyle});
      setAlert({open:true, message: response.data.message});
      setTimeout(()=> navigator('/login'),3000);
    }catch(error){
      setAlert({open:true, message: error.response?.data?.message || 'Registration failed'});
    }
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
      <TextField label="Username" variant="outlined" value={userName} onChange={(e) => setUserName(e.target.value)} required fullWidth sx={{marginBottom:'30px'}}/>
      <TextField label="Password" variant="outlined" type="password"  value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth sx={{marginBottom:'30px'}}/>
      <TextField variant="outlined" label="Preferences" value={preferences} onChange={(e) => setPreferences(e.target.value)} required fullWidth sx={{marginBottom:'30px'}}/>
      <TextField variant="outlined" label="Learning Style" value={learningStyle} onChange={(e) => setLearningStyle(e.target.value)} required fullWidth sx={{marginBottom:'30px'}}/>
      <Button variant="contained" color="primary" fullWidth type="submit" sx={{padding:'10px'}}>Register</Button>
      
    </form>
    <Snackbar
        open = {alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({open:false,message:''})}
        message={alert.message}
      />
    </Paper>
    </Box>
  );
};

export default Register;