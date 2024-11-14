import { useEffect, useState } from "react";
import { getRecommendations, getUser, getContents } from "../../api";
import { useAuth } from "../../authContentUtils";
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, CircularProgress, Divider, Snackbar } from '@mui/material';
import { ViewAgenda } from "@mui/icons-material";
import PostCard from "./PostCard";

const ContentList = () => {
  const [posts, setPosts] = useState([]);
  const [contentList, setContentList] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingContent, setLoadingContent] = useState(true);
  const { getToken, getUserId } = useAuth();
  const [alert, setAlert] = useState({ open: false, message: '' });

  useEffect(() => {
    const contents = async () => {
      try {
        const response = await getUser(getUserId(), getToken());
        const user = response.data;
        const getPosts = await getContents({ userId: user.id, preferences: user.preferences, learningStyle: user.learningStyle }, getToken());
        setPosts(getPosts?.data);
      } catch (error) {
        console.error(error); // For debugging
        setAlert({ open: true, message: 'Oops! Something went wrong while fetching posts. Please try again later.' });
      } finally {
        setLoadingPost(false);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const response = await getRecommendations(getUserId(), 9, getToken());
        setContentList(response.data.recommendations);
      } catch (error) {
        console.error(error); // For debugging
        setAlert({ open: true, message: 'Oops! Something went wrong while fetching recommendations. Please try again later.' });
      } finally {
        setLoadingContent(false);
      }
    };

    contents();
    fetchRecommendations();
  }, [getUserId, getToken]);

  return (
    <Box sx={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom textAlign="left" color="primary">
        Suggested Posts
      </Typography>

      {loadingPost ? (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="200px"> {/* Centered loading state */}
          <CircularProgress size={50} />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Loading your personalized posts for you...
          </Typography>
        </Box>
      ) : posts.length > 0 ? (
        <Grid container spacing={4}>
          {posts.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <PostCard  post={post} onDelete={null} onEdit={null}/>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" color="textSecondary" align="left">
          It looks like there aren’t any suggested posts for you right now.
          Don’t worry, new content is added regularly—stay tuned and explore some of our other exciting categories!
        </Typography>
      )}

      <Divider style={{ margin: '15px' }} />
      <Typography variant="h4" gutterBottom textAlign="left" color="primary">
        Suggested Content
      </Typography>

      {loadingContent ? (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="200px"> {/* Centered loading state */}
          <CircularProgress size={50} />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Loading your personalized recommendations...
          </Typography>
        </Box>
      ) : contentList.length > 0 ? (
        <Grid container spacing={4}>
          {contentList.map((content, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <PostCard  post={content} onDelete={null} onEdit={null}/>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" color="textSecondary" align="left">
          We don’t have any recommendations just yet. Why not discover something new in other sections? 
          Keep checking back as we tailor suggestions just for you!
        </Typography>
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

export default ContentList;