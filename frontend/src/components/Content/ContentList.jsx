import { useEffect, useState } from "react";
import { getRecommendations, getUser, getContents } from "../../api";
import { useAuth } from "../../authContentUtils";
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, CircularProgress, Divider, Snackbar } from '@mui/material';
import { ViewAgenda } from "@mui/icons-material";

const ContentList = () => {
  const [posts, setPosts] = useState([]);
  const [contentList, setContentList] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingContent, setLoadingContent] = useState(true);
  const {getToken, getUserId} = useAuth();
  const [alert, setAlert] = useState({ open: false, message: '' });

  useEffect(() => {

    const contents = async () => {
      try{
        const response = await getUser(getUserId(), getToken());
        const user = response.data;
        const getPosts = await getContents({userId : getUserId(), preferences : user.preferences, learningStyle : user.learningStyle}, getToken());
        setPosts(getPosts?.data);
      }catch(error) {
        console.error(error); // For debugging
        setAlert({open:true, message: 'Oops! Something went wrong while fetching posts. Please try again later.' });
      } finally {
        setLoadingPost(false);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const response = await getRecommendations(getUserId(), getToken());
        setContentList(response.data.recommendations);
      } catch (error) {
        console.error(error); // For debugging
        setAlert({open:true, message: 'Oops! Something went wrong while fetching recommendations. Please try again later.' });
      } finally {
        setLoadingContent(false);
      }
    };

    contents();
    fetchRecommendations();
  }, [getUserId,getToken]);

  return (
    <Box sx={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom textAlign="left" color="primary">
        Suggested Posts
      </Typography>
      {loadingPost ? (
        <Box display="flex" flexDirection="column" justifyContent="left" alignItems="left" height="200px">
          <CircularProgress size={50} />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Loading your personalized posts for you...
          </Typography>
        </Box>
        ) : posts.length > 0 ? (
          <Grid container spacing={4}>
          {posts.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                variant="outlined"
                key={index}
                sx={{
                  height: '100%',
                  boxShadow: 3,
                  transition: 'transform 0.3s',
                  borderRadius: '10px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  color: 'white',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  },
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for readability
                    borderRadius: '10px',
                  },
                }}
              >
                <CardContent sx={{ position: 'relative', zIndex: 2 }}>
                  <Typography variant="h5" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {post.description.length > 80
                      ? post.description.substring(0, 80) + '...'
                      : post.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ position: 'relative', zIndex: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="info"
                    href={post.contentURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    component="a"
                    startIcon={<ViewAgenda />}
                    sx={{
                      ml: 'auto',
                      mr: 'auto',
                      backgroundColor: '#0288d1', // Brighter button for visibility
                      '&:hover': { backgroundColor: '#0277bd' },
                    }}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        ) : (
          <Typography variant="h6" color="textSecondary" align="left">
            It looks like there aren’t any suggested posts for you right now.
            Don’t worry, new content is added regularly—stay tuned and explore some of our other exciting categories!
          </Typography>
      )}
      <Divider style={{margin:'15px'}}></Divider>
      <Typography variant="h4" gutterBottom textAlign="left" color="primary">
        Suggested Content
      </Typography>

      {/* Display a loading indicator while data is being fetched */}
      {loadingContent ? (
        <Box display="flex" flexDirection="column" justifyContent="left" alignItems="left" height="200px">
          <CircularProgress size={50} />
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Loading your personalized recommendations...
          </Typography>
        </Box>
      ) : contentList.length > 0 ? (
        <Grid container spacing={4}>
          {contentList.map((content, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                variant="outlined"
                key={index}
                sx={{
                  height: '100%',
                  boxShadow: 3,
                  transition: 'transform 0.3s',
                  borderRadius: '10px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  color: 'white',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  },
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for readability
                    borderRadius: '10px',
                  },
                }}
              >
                <CardContent sx={{ position: 'relative', zIndex: 2 }}>
                  <Typography variant="h5" gutterBottom>
                    {content.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {content.description.length > 80
                      ? content.description.substring(0, 80) + '...'
                      : content.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ position: 'relative', zIndex: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="info"
                    href={content.contentURL || content.contenturl || content.contentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    component="a"
                    startIcon={<ViewAgenda />}
                    sx={{
                      ml: 'auto',
                      mr: 'auto',
                      backgroundColor: '#0288d1', // Brighter button for visibility
                      '&:hover': { backgroundColor: '#0277bd' },
                    }}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
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