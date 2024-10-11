import React, { useState } from "react";
import { uploadContent } from "../../api";
import { getToken } from "../../authService";
import { Box, Button, Typography, TextField, Snackbar, CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { PostAddTwoTone } from "@mui/icons-material";

const UploadPost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentURL, setContentURL] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = getToken();
  const navigator = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await uploadContent({ title, description, contentURL, authorId: 1 }, token);
      setAlert({ open: true, message: 'Content uploaded successfully!' });
      
      // Clear the form after successful upload
      setTitle('');
      setDescription('');
      setContentURL('');
      
      // Navigate to posts page after a delay
      setTimeout(() => navigator('/intelli-share/posts'), 3000);
    } catch (error) {
      setAlert({ open: true, message: error.response?.data?.message || 'Content upload failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: '8px',
        boxShadow: 2,
        mt: 4,
        mb: 4,
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
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
          <Button
            variant="contained"
            type="submit"
            color="success"
            startIcon={<PostAddTwoTone />}
            disabled={isSubmitting}
            sx={{ padding: '8px 15px', minWidth: '120px' }}
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </Button>
          {isSubmitting && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
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