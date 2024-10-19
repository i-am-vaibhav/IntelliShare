import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Button, Stack, Snackbar, CircularProgress } from '@mui/material';
import { Explore, PostAddOutlined } from '@mui/icons-material';
import { useAuth } from '../authContentUtils';
import { getContent, getRecommendations } from '../api';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [uploads, setUploads] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const {getToken, getUserId} = useAuth();
    const navigate = useNavigate();
    const [alert, setAlert] = useState({ open: false, message: '' });
    const [loadingContent, setLoadingContent] = useState(true);

    // Fetch posts and recommendations on page load
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getContent(getUserId(), getToken());
                setUploads(response.data);
            } catch (error) {
                setAlert({open :true, message : error.response?.data?.message || 'Failed to fetch posts'});
            }
        };

        const fetchRecommendations = async () => {
            try {
                const response = await getRecommendations(getUserId(), 6 , getToken());
                setRecommendations(response.data.recommendations);
            } catch (error) {
                if (error.response.status!=404 ) {
                    setAlert({open :true,message : error.response?.data?.message || 'Oops! Something went wrong while fetching recommendations.'})
                }
            } finally {
                setLoadingContent(false);
            }
        };

        const callAllFunctions = async () => {
            await fetchPosts();
            await fetchRecommendations();
        }
        callAllFunctions();
    }, [getUserId,getToken]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#f0f4f8', padding: '20px' }}>
            <Box sx={{ marginBottom: '20px' }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                    Welcome back!
                </Typography>
            </Box>

            <Typography variant="body1" gutterBottom sx={{ color: '#555', marginBottom: '20px' }}>
                Here’s an overview of your recent activity and recommendations.
            </Typography>

            {/* Quick Access Buttons */}
            <Stack direction="row" spacing={2} sx={{ marginBottom: '20px' }}>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<PostAddOutlined/>}
                    onClick={() => navigate('/intelli-share/upload')}
                >
                    Post
                </Button>
                <Button
                    variant="contained"
                    color="info"
                    startIcon={<Explore />}
                    onClick={() => navigate('/intelli-share/feed')}
                >
                    Explore
                </Button>
            </Stack>

            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
                {/* Recent Uploads Section */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: '20px', borderRadius: '12px', bgcolor: '#fff' }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: '600', color: '#1976d2' }}>
                            Recent Uploads
                        </Typography>
                        {uploads.length > 0 ? (
                            uploads.map((upload) => (
                                <Typography key={upload.id} variant="body2" sx={{ marginBottom: '8px', color: '#555' }}>
                                    {upload.title}
                                </Typography>
                            ))
                        ) : (
                            <Typography variant="body1" sx={{ color: '#888' }}>
                                No recent uploads. Start by uploading your first post!
                            </Typography>
                        )}
                    </Paper>
                </Grid>

                {/* Recommendations Section */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: '20px', borderRadius: '12px', bgcolor: '#fff' }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: '600', color: '#1976d2' }}>
                            Recommended for You
                        </Typography>
                        {loadingContent ? (
                            <Box display="flex" flexDirection="column" justifyContent="left" alignItems="left" height="200px">
                            <CircularProgress size={30} />
                            <Typography variant="inherit" sx={{ marginTop: 2 }}>
                                Loading your personalized recommendations...
                            </Typography>
                            </Box>
                        ) : recommendations.length > 0 ? (
                            recommendations.map((rec,index) => (
                                <Typography key={index} variant="body2" sx={{ marginBottom: '8px', color: '#555' }}>
                                    {rec.title}
                                </Typography>
                            ))
                        ) : (
                            <Typography variant="body1" sx={{ color: '#888' }}>
                                We didn’t find any recommendations for you right now, but keep exploring! We’ll suggest content based on your activity soon.
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
            <Snackbar
              open = {alert.open}
              autoHideDuration={6000}
              onClose={() => setAlert({open:false,message:''})}
              message={alert.message}
            />
        </Box>
    );
};

export default HomePage;