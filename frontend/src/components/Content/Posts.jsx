import React, {useEffect, useState} from "react";
import { deleteContent, getContent } from "../../api";
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, Snackbar } from '@mui/material';
import { AddCircleOutlineOutlined, Delete, ViewAgenda } from "@mui/icons-material";
import { useAuth } from "../../authContext";

const Posts = () => {
  
  const [posts, setPosts] = useState([]);
  const {getToken,getUserId} = useAuth();
  const [alert, setAlert] = useState({open:false,message:''});

  const fetchPosts = async () => {      
    try{
      const response = await getContent(getUserId(), getToken());
      setPosts(response.data);
    }catch(error){
      setAlert({open:true, message: error.response?.data?.message || 'Failed to fetch posts'});
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (contentId) => {
    const response = await deleteContent(contentId,getToken());
    if(response.data.success){
      setAlert({open:true, message: response.data.message});
      fetchPosts();
    }
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom>
            My Posts
        </Typography>
        {posts.length > 0 ? (
          <Grid container spacing={4}>
            {posts.map((post,index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                      variant="outlined"
                      sx={{
                          height: '100%',
                          boxShadow: 3, // Adjust shadow intensity (1-24) or use a custom shadow
                          transition: 'transform 0.3s', // Smooth transition for hover effect
                          '&:hover': {
                              transform: 'scale(1.05)', // Scale effect on hover
                              boxShadow: 6, // Increase shadow on hover
                          },
                      }}
                  >
                      <CardContent>
                          <Typography variant="h5" gutterBottom>
                              {post.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" gutterBottom>
                              {post.description}
                          </Typography>
                      </CardContent>
                      <CardActions>
                          <Button
                              size="small"
                              variant="contained"
                              color="info"
                              href={post.contentURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              component="a"
                              startIcon={<ViewAgenda/>}
                          >
                              View
                          </Button>
                          <Button
                              size="small"
                              variant="contained"
                              color="warning"
                              onClick={() => handleDelete(`${post.id}`) }
                              target="_blank"
                              rel="noopener noreferrer"
                              startIcon={<Delete/>}
                          >
                              Delete
                          </Button>
                      </CardActions>
                  </Card>
              </Grid>          
            ))}
          </Grid>
        ) : (
          <Box mt={5}>
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
                startIcon={<AddCircleOutlineOutlined />} // Icon to make the button stand out
                href="/intelli-share/upload" // Assuming this is the route for the upload page
                sx={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    backgroundColor: '#ff5722', // Custom color for button
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
    </Box>
  );
};

export default Posts;