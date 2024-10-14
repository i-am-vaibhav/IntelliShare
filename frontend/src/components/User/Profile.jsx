// src/components/ProfilePage.jsx
import { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField, Snackbar } from '@mui/material';
import { useAuth } from '../../authContentUtils';
import { getUser, updateUserProfile } from '../../api';
import { Cancel, Check, Update } from '@mui/icons-material';

const Profile = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [preferences, setPreferences] = useState('');
    const [learningStyle, setLearningStyle] = useState('');
    const [alert, setAlert] = useState({open:false,message:''});
    const {getUserId,getToken} = useAuth();

    // Fetch user profile details when component loads
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUser(getUserId(), getToken());
                const user = response.data;
                setPreferences(user.preferences || '');
                setLearningStyle(user.learningStyle || '');
            } catch (error) {
                console.error("Error fetching profile details:", error);
            }
        };

        fetchProfile();
    }, [getUserId,getToken]);

    const handleUpdateProfile = async () => {
        try {
            const response = await updateUserProfile({
                userId: getUserId(),
                preferences,
                learningStyle
            }, getToken());

            if (response.data.success) {
                setAlert({open:true, message: 'Profile updated successfully!'});
                setIsEditMode(false);  // Switch back to view mode
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setAlert({open:true, message: 'Error updating profile!'});
        }
    };

    return (
      <Box
            sx={{
                padding: '20px',
                maxWidth: '600px',
                margin: '0 auto',
                backgroundColor: (theme) => theme.palette.background.paper, // Match background to theme
                borderRadius: '8px', // Rounded corners for aesthetic appeal
                boxShadow: 2, // Subtle shadow effect
            }}>
            <Typography variant="h4" gutterBottom>
                Profile Details
            </Typography>

            {!isEditMode ? (
                // View Mode
                <>
                    <Typography variant="body1" gutterBottom>
                        <strong>Preferences:</strong> {preferences || 'Not set'}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Learning Style:</strong> {learningStyle || 'Not set'}
                    </Typography>
                    <Button
                        variant="contained"
                        color="info"
                        sx={{ marginTop: '20px' }}
                        onClick={() => setIsEditMode(true)}
                        startIcon={<Update/>}
                    >
                        Update Profile
                    </Button>
                </>
            ) : (
                // Edit Mode
                <>
                    <TextField
                        fullWidth
                        label="Preferences"
                        value={preferences}
                        onChange={(e) => setPreferences(e.target.value)}
                        multiline
                        rows={4}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Learning Style"
                        value={learningStyle}
                        onChange={(e) => setLearningStyle(e.target.value)}
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ margin: '10px', padding: '8px 15px' }}
                        onClick={handleUpdateProfile}
                        startIcon={<Check/>}
                    >
                        Submit
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        sx={{ margin: '10px', padding: '8px 15px' }}
                        onClick={() => setIsEditMode(false)}  // Cancel update
                        startIcon={<Cancel/>}
                    >
                        Cancel
                    </Button>
                </>
            )}
            <Snackbar
              open = {alert.open}
              autoHideDuration={6000}
              onClose={() => setAlert({open:false,message:''})}
              message={alert.message}
            />
      </Box>
    );
};

export default Profile;
