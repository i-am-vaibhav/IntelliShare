// src/components/MainPage.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        IntelliShare
                    </Typography>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/register">Register</Button>
                </Toolbar>
            </AppBar>

            <div style={{ padding: '20px' }}>
                <Typography variant="h4" gutterBottom align="center">
                    Welcome to IntelliShare
                </Typography>
                <Typography variant="h6" align="center" paragraph>
                    Share knowledge and collaborate in real-time with our content sharing platform tailored to your learning preferences!
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Content Sharing
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Upload and share your content with others. Adapt content based on user preferences and learning styles.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={Link} to="/register">Get Started</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Real-Time Collaboration
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Collaborate on documents and projects in real-time with your team members.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={Link} to="/register">Join Us</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Personalized Experience
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Our platform adapts to your learning style, providing a customized experience just for you.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={Link} to="/register">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default LandingPage;
