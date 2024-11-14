import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Box } from '@mui/material';
import { ViewAgenda, Delete, Edit } from '@mui/icons-material';

const PostCard = ({ post, onEdit, onDelete }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2, // More rounded corners
        background: 'linear-gradient(135deg, #f5f5f5 30%, #fafafa)', // Subtle background gradient
        boxShadow: 3,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 8, // Increase shadow for depth
          backgroundColor: '#f0f0f0', // Light background on hover
        },
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          {post.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {post.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button
          size="medium"
          variant="contained"
          color="info"
          href={post.contentURL}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<ViewAgenda />}
          sx={{
            padding: '6px 25px',
            fontWeight: 'bold',
            transition: 'background-color 0.2s ease',
            '&:hover': {
              backgroundColor: '#1976d2',
            },
          }}
        >
          View
        </Button>
        
        {onEdit && (
            <Button
              size="medium"
              variant="contained"
              color="primary"
              onClick={() => onEdit(post)}
              startIcon={<Edit />}
              sx={{
                marginRight: 1,
                padding: '6px 25px',
                fontWeight: 'bold',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  backgroundColor: '#303f9f',
                },
              }}
            >
              Edit
            </Button>
          )}
          
          {onDelete && (
            <Button
              size="medium"
              variant="contained"
              color="error"
              onClick={() => onDelete(post.id)}
              startIcon={<Delete />}
              sx={{
                padding: '6px 30px',
                fontWeight: 'bold',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  backgroundColor: '#d32f2f',
                },
              }}
            >
              Delete
            </Button>
            )}
        
      </CardActions>
    </Card>
  );
};

export default PostCard;