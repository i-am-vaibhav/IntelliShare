import React, { useEffect, useState } from "react";
import { getRecommendations } from "../../api";
import { getToken, getUserId } from "../../authService";
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, CircularProgress } from '@mui/material';
import { ViewAgenda } from "@mui/icons-material";

const ContentList = () => {
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = getToken();
  const userId = getUserId();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await getRecommendations(userId, token);
        setContentList(response.data.recommendations);
      } catch (error) {
        console.error(error); // For debugging
        alert('Oops! Something went wrong while fetching recommendations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <Box sx={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom textAlign="center" color="primary">
        Recommended Content
      </Typography>

      {/* Display a loading indicator while data is being fetched */}
      {loading ? (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="200px">
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
                    href={content.contentURL}
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
        <Typography variant="h6" color="textSecondary" align="center">
          No recommendations available at the moment. Explore other content or check back later!
        </Typography>
      )}
    </Box>
  );
};

export default ContentList;