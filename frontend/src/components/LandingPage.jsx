import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, CardActions, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import {  Create, Login } from '@mui/icons-material';

const LandingPage = () => {
    return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <AppBar position="static" color='primary'>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Button
                                variant='text'
                                color='inherit'
                                size='large'
                                to="/"
                                component={Link}
                                startIcon={<Avatar src='/IntelliShare Logo.svg' alt="IntelliShare Logo" />}
                            >
                                IntelliShare
                            </Button>
                        </Typography>
                        <Button color="success" component={Link} to="/login" sx={{ marginX: '5px' }} startIcon={<Login />}>
                            Login
                        </Button>
                        <Button color="warning" component={Link} to="/register" sx={{ marginX: '5px' }} startIcon={<Create />}>
                            Register
                        </Button>
                    </Toolbar>
                </AppBar>
    
                <div style={{ flexGrow: 1, padding: '40px 20px', backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" gutterBottom align="center" style={{ fontWeight: 'bold', color: '#333' }}>
                        Welcome to IntelliShare
                    </Typography>
                    <Typography variant="h6" align="center" paragraph style={{ color: '#555' }}>
                        Discover, learn, and share knowledge like never before! Our AI-powered platform tailors content to your learning preferences, empowering you to connect with a vibrant community.
                    </Typography>
    
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Card elevation={3} style={{ borderRadius: '12px', padding: '20px' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div" style={{ fontWeight: '600', color: '#007BFF' }}>
                                        AI-Powered Feed
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Experience a personalized learning journey with our AI-driven feed that curates content based on your interests and learning style. Stay informed and inspired with tailored recommendations!
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" variant="contained" color="primary" component={Link} to="/register">
                                        Get Started
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card elevation={3} style={{ borderRadius: '12px', padding: '20px' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div" style={{ fontWeight: '600', color: '#007BFF' }}>
                                        Content Sharing
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Effortlessly upload and share your insights and knowledge with a diverse community. Engage with others by adapting your content to various preferences and learning styles for optimal impact.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" variant="contained" color="primary" component={Link} to="/register">
                                        Share Your Knowledge
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card elevation={3} style={{ borderRadius: '12px', padding: '20px' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div" style={{ fontWeight: '600', color: '#007BFF' }}>
                                        Connect & Collaborate
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Join a thriving community of learners and educators! Collaborate, exchange ideas, and learn from each other’s experiences to enhance your knowledge and skills.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" variant="contained" color="primary" component={Link} to="/register">
                                        Join the Community
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
    
                <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#007BFF', color: 'white' }}>
                    <Typography variant="body2">
                        © {new Date().getFullYear()} IntelliShare. All rights reserved.
                    </Typography>
                </footer>
            </div>
    );
};

export default LandingPage;
