import React, {useState} from "react";
import { uploadContent } from "../../api";
import { getToken } from "../../authService";
import { Box, Button, Typography, TextField, Snackbar } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { PostAddTwoTone } from "@mui/icons-material";



const UploadPost = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentURL, setContentURL] = useState('');
  const [alert, setAlert] = useState({open:false,message:''});
  const token = getToken();
  const navigator = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const response = await uploadContent({title, description,contentURL,authorId:1}, token);
      setAlert({open:true, message: response.data.message});
      navigator('/intelli-share/posts');
    }catch(error){
      setAlert({open:true, message: error.response?.data?.message || 'Content upload failed'});
    }
  };

  return (
    <Box
            sx={{
                padding: '20px',
                maxWidth: '600px',
                margin: '0 auto',
                backgroundColor: (theme) => theme.palette.background.paper, // Match background to theme
                borderRadius: '8px', // Rounded corners for aesthetic appeal
                boxShadow: 2, // Subtle shadow effect
            }}
        >
            <Typography variant="h4" gutterBottom textAlign="center">
                Post Content
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Content URL"
                    value={contentURL}
                    onChange={(e) => setContentURL(e.target.value)}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
                <Button
                    variant="contained"
                    type="submit"
                    color="success"
                    startIcon={<PostAddTwoTone/>}
                    sx={{ position: 'relative', margin: '10px', padding: '8px 15px' }}
                >
                    Post
                </Button>
            </form>
            <Snackbar
                open={alert.open}
                autoHideDuration={6000}
                onClose={() => setAlert({ open: false, message: '' })}
                message={alert.message}
            />
        </Box>
  );
};

export default UploadPost;