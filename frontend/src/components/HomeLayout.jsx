import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Button, IconButton, Avatar, Divider } from '@mui/material';
import { UploadFile as UploadFileIcon, Recommend as RecommendIcon, PostAddOutlined, AccountCircle, Logout, Menu } from '@mui/icons-material';
import { useAuth } from '../authContentUtils';
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';

const drawerWidth = 240;

const HomeLayout = () => {
    const navigator = useNavigate();
    const { logout } = useAuth();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)'); // Adjust breakpoint as necessary

    const handleLogout = () => {
        logout();
        navigator("/login");
    };

    const handleProfileClick = () => {
        navigator('/intelli-share/profile'); 
    };

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    const handleListItemClick = (path) => {
        navigator(path);
        if (isMobile) {
            setDrawerOpen(false); // Close drawer only on mobile
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CssBaseline />

            {/* AppBar */}
            <AppBar position="fixed" color='primary' sx={{ zIndex: 1201 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        <Button variant='text' component={Link} color='inherit' size='large' to="/intelli-share/" startIcon={
                            <Avatar src='/IntelliShare Logo.svg' alt="IntelliShare Logo" />
                        }>
                            {isMobile ?  "": "IntelliShare" }
                        </Button>
                    </Typography>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{ display: { xs: 'block', md: 'none' } }} // Show only on mobile
                    >
                        <Menu />
                    </IconButton>

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

            {/* Drawer */}
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        bgcolor: (theme) => theme.palette.primary.main,
                        color: (theme) => theme.palette.primary.contrastText,
                        borderRight: '1px solid rgba(255, 255, 255, 0.12)',
                        transition: 'background-color 0.3s',
                    },
                }}
                variant={isMobile ?  "temporary": "permanent" } // Temporary for mobile, permanent for desktop
                open={isDrawerOpen}
                onClose={toggleDrawer}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                <Toolbar />
                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                <List>
                    {/* Navigation Links */}
                    <ListItem button onClick={() => handleListItemClick("/intelli-share/feed")} sx={{ '&:hover': { bgcolor: (theme) => theme.palette.secondary.dark } }}>
                        <ListItemIcon sx={{ color: (theme) => theme.palette.primary.contrastText }}>
                            <RecommendIcon />
                        </ListItemIcon>
                        <ListItemText primary="My Feed" primaryTypographyProps={{ color: (theme) => theme.palette.primary.contrastText }} />
                    </ListItem>
                    <ListItem button onClick={() => handleListItemClick("/intelli-share/upload")} sx={{ '&:hover': { bgcolor: (theme) => theme.palette.secondary.dark } }}>
                        <ListItemIcon sx={{ color: (theme) => theme.palette.primary.contrastText }}>
                            <UploadFileIcon />
                        </ListItemIcon>
                        <ListItemText primary="Post" primaryTypographyProps={{ color: (theme) => theme.palette.primary.contrastText }} />
                    </ListItem>
                    <ListItem button onClick={() => handleListItemClick("/intelli-share/posts")} sx={{ '&:hover': { bgcolor: (theme) => theme.palette.secondary.dark } }}>
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
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 2, pb: 5, m: '0 auto', mt: 10}}
            >
                <Outlet />
            </Box>

            {/* Footer */}
            <Box component="footer" sx={{
                bgcolor: (theme) => theme.palette.secondary.main,
                color: (theme) => theme.palette.primary.contrastText,
                textAlign: 'center',
                padding: '20px',
                bottom: 0,
                width: '100%',
                boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.6)',
            }}>
                <Typography variant="body2">
                    © {new Date().getFullYear()} IntelliShare. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default HomeLayout;
