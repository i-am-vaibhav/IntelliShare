import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Button, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getToken, getUserId, logout } from '../authService';
import { getContent, getRecommendations } from '../api';

const drawerWidth = 240;

const HomePage = () => {
    const [uploads, setUploads] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const navigator = useNavigate();
    const token = getToken();
    const userId = getUserId();

    // Fetch recent uploads and recommendations on page load
    useEffect(() => {
        getContent(userId,token)
            .then((response) => setUploads(response.data))
            .catch((error) => console.log(error));

        getRecommendations(userId,token)
            .then((response) => setRecommendations(response.data))
            .catch((error) => console.log(error));
    }, []);

    const handleProfileClick = () => {
      navigator('/intelli-share/profile');
    };

    const handleLogout = () => {
      logout();
    };

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#f0f4f8', padding: '20px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                  Welcome back!
              </Typography>
          </Box>

          <Typography variant="body1" gutterBottom sx={{ color: '#555' }}>
              Here’s an overview of your recent activity and recommendations.
          </Typography>

          {/* Dashboard Grid */}
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
                      {recommendations.length > 0 ? (
                          recommendations.map((rec) => (
                              <Typography key={rec.id} variant="body2" sx={{ marginBottom: '8px', color: '#555' }}>
                                  {rec.title}
                              </Typography>
                          ))
                      ) : (
                          <Typography variant="body1" sx={{ color: '#888' }}>
                              We’ll recommend content based on your activity. Keep exploring!
                          </Typography>
                      )}
                  </Paper>
              </Grid>
          </Grid>
      </Box>
    );
};

export default HomePage;