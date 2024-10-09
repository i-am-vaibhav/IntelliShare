import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Button } from '@mui/material';
import { UploadFile as UploadFileIcon, Recommend as RecommendIcon } from '@mui/icons-material';
import { logout } from '../authService';

const drawerWidth = 240;

const HomeLayout = () => {
    const navigator = useNavigate();
    const handleLogout = () => {
        logout();
        navigator("/login");
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* AppBar */}
            <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        IntelliShare
                    </Typography>

                    <Button color="secondary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <List>
                    {/* Navigation Links */}
                    <ListItem button component={Link} to="/intelli-share/upload">
                        <ListItemIcon>
                            <UploadFileIcon />
                        </ListItemIcon>
                        <ListItemText primary="Post" />
                    </ListItem>
                    <ListItem button component={Link} to="/intelli-share/recommendations">
                        <ListItemIcon>
                            <RecommendIcon />
                        </ListItemIcon>
                        <ListItemText primary="Recommendations" />
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
        </Box>
    );
};

export default HomeLayout;
