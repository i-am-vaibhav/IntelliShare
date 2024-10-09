import React, {useState} from "react";
import { loginUser } from "../../api";
import { TextField, Button, Snackbar, Typography, Paper, Box } from '@mui/material';
import { LockOpen as LockOpenIcon } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

const Login = ({onLogin}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({open:false,message:''});
  const navigator = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const response = await loginUser({userName, password});
      setAlert({open:true, message: 'Logged in successfully'});
      onLogin(response.data.userId,response.data.token);
      navigator("/intelli-share")
    }catch(error){
      setAlert({open:true, message: error.response?.data?.message || 'Login failed'});
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
                    <LockOpenIcon fontSize="large" color="primary" />
                    <Typography variant="h5" component="h1" sx={{ marginLeft: '10px' }}>
                        Login to IntelliShare
                    </Typography>
                </Box>

    <form onSubmit={handleSubmit}>
    <TextField label="Username" variant="outlined" value={userName} onChange={(e) => setUserName(e.target.value)} required fullWidth sx={{marginBottom:'30px'}}/>
    <TextField label="Password" variant="outlined" type="password"  value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth sx={{marginBottom:'30px'}}/>
      <Button variant="contained" color="primary" type="submit" fullWidth
                        sx={{ padding: '10px' }}>Login</Button>
      </form>

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