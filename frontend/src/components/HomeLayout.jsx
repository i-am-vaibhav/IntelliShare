import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Button, IconButton, Avatar, Divider } from '@mui/material';
import { UploadFile as UploadFileIcon, Recommend as RecommendIcon, PostAddOutlined, AccountCircle, Logout } from '@mui/icons-material';
import { useAuth } from '../authContext';

const drawerWidth = 240;

const HomeLayout = () => {
    const navigator = useNavigate();
    const { logout } = useAuth();
    const handleLogout = () => {
        logout();
        navigator("/login");
    }

    const handleProfileClick = () => {
        navigator('/intelli-share/profile'); 
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* AppBar */}
            <AppBar position="fixed" color='primary' sx={{ zIndex: 1201}}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        <Button variant='text' component={Link} color='inherit' size='large' to="/intelli-share/" startIcon={
                            <Avatar src='/IntelliShare Logo.svg' alt="IntelliShare Logo" />
                        } >IntelliShare</Button>
                    </Typography>

                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="account of current user"
                        onClick={handleProfileClick}
                        sx={{ ml: 'auto', marginRight: '10px' }} 
                    >
                        <AccountCircle />
                    </IconButton>
                    <Button variant='contained' color='error' startIcon={<Logout />} onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        bgcolor: (theme) => theme.palette.primary.main, // Using primary color for drawer background
                        color: (theme) => theme.palette.primary.contrastText, // White text
                        borderRight: '1px solid rgba(255, 255, 255, 0.12)',
                        transition: 'background-color 0.3s', // Smooth transition
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                <List>
                    {/* Navigation Links */}
                    <ListItem button component={Link} to="/intelli-share/feed" sx={{ '&:hover': { bgcolor: (theme) => theme.palette.secondary.dark } }}>
                        <ListItemIcon sx={{ color: (theme) => theme.palette.primary.contrastText }}>
                            <RecommendIcon />
                        </ListItemIcon>
                        <ListItemText primary="My Feed" primaryTypographyProps={{ color: (theme) => theme.palette.primary.contrastText }} />
                    </ListItem>
                    <ListItem button component={Link} to="/intelli-share/upload" sx={{ '&:hover': { bgcolor: (theme) => theme.palette.secondary.dark } }}>
                        <ListItemIcon sx={{ color: (theme) => theme.palette.primary.contrastText }}>
                            <UploadFileIcon />
                        </ListItemIcon>
                        <ListItemText primary="Post" primaryTypographyProps={{ color: (theme) => theme.palette.primary.contrastText }} />
                    </ListItem>
                    <ListItem button component={Link} to="/intelli-share/posts" sx={{ '&:hover': { bgcolor: (theme) => theme.palette.secondary.dark } }}>
                        <ListItemIcon sx={{ color: (theme) => theme.palette.primary.contrastText }}>
                            <PostAddOutlined />
                        </ListItemIcon>
                        <ListItemText primary="My Posts" primaryTypographyProps={{ color: (theme) => theme.palette.primary.contrastText }} />
                    </ListItem>
                </List>
            </Drawer>
            {/* Main Content */}
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, mt: 8 }}
            >
                <Outlet />
            </Box>

            {/* Footer */}
            <Box component="footer" sx={{
                bgcolor: (theme) => theme.palette.secondary.main,
                color: (theme) => theme.palette.primary.contrastText,
                textAlign: 'center',
                padding: '20px',
                position: 'fixed',
                bottom: 0,
                width: '100%',
                boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.6)', // Add left shadow
            }}>
                <Typography variant="body2">
                    © {new Date().getFullYear()} IntelliShare. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default HomeLayout;
