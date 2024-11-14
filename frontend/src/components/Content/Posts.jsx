import { useCallback, useEffect, useState } from "react";
import { deleteContent, getContent, updateContent } from "../../api";
import { Box, Typography, Grid, Button, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress, Toolbar, Divider } from '@mui/material';
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { useAuth } from "../../authContentUtils";
import PostCard from "./PostCard";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { getToken, getUserId } = useAuth();
  const [alert, setAlert] = useState({ open: false, message: '' });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentURL, setContentURL] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getContent(getUserId(), getToken());
      setPosts(response.data);
    } catch (error) {
      setAlert({ open: true, message: error.response?.data?.message || 'Failed to fetch posts' });
    } finally {
      setLoading(false);
    }
  }, [getUserId, getToken]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (contentId) => {
    const response = await deleteContent(contentId, getToken());
    if (response.data.success) {
      setAlert({ open: true, message: response.data.message });
      fetchPosts();
    }
  };

  const handleUpdatePostModel = (post) => {
    setTitle(post.title);
    setDescription(post.description);
    setContentURL(post.contentURL);
    setOpenModal(true);
  };

  const handleUpdatePost = async () => {
    const postData = { title, description, contentURL, userId: getUserId() };
    try {
      const response = await updateContent(postData, getToken());
      setAlert({ open: true, message: response.data.message });
      fetchPosts();
    } catch (error) {
      setAlert({ open: true, message: error.response?.data?.message || 'Failed to update post' });
    } finally {
      setOpenModal(false);
    }
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <Toolbar />
      <Typography variant="h4" gutterBottom textAlign="left" color="primary">
        My Posts
      </Typography>

      {loading ? (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress size={50} />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Loading your posts...
          </Typography>
        </Box>
      ) : posts.length > 0 ? (
        <Grid container spacing={4}>
          {posts.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <PostCard post={post} onEdit={handleUpdatePostModel} onDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box mt={5} textAlign="left">
          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
            It’s your time to shine!
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Share your first post and start creating amazing content.
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Whether it’s a blog, tutorial, or video, your first post can make an impact!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<AddCircleOutlineOutlined />}
            href="/intelli-share/upload"
            sx={{
              marginTop: '20px',
              padding: '10px 20px',
              fontWeight: 'bold',
              fontSize: '16px',
              backgroundColor: '#ff5722',
              '&:hover': {
                backgroundColor: '#e64a19',
              },
            }}
          >
            Get Started & Upload Your Content
          </Button>
        </Box>
      )}

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ open: false, message: '' })}
        message={alert.message}
      />

      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth>
        <DialogTitle>Update Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            disabled
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Content URL"
            type="url"
            fullWidth
            variant="outlined"
            value={contentURL}
            onChange={(e) => setContentURL(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdatePost} color="primary" variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Posts;