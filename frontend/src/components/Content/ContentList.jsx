import React, {useEffect, useState} from "react";
import { getRecommendations } from "../../api";
import { getToken, getUserId } from "../../authService";
import { Box, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';


const ContentList = () => {
  
  const [contentList, setContentList] = useState([]);
  const token = getToken();
  const userId = getUserId();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try{
        const response = await getRecommendations(userId, token);
        setContentList(response.data);
      }catch(error){
        alert('Failed to fetch content recommendations');
      }
    };

    fetchRecommendations();
  }, []);

  

  return (
      <Box sx={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
          <Typography variant="h4" gutterBottom>
              Recommended Content
          </Typography>
          {contentList.length > 0 ? (
            <Grid container spacing={4}>
              {contentList.map((content,index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                        variant="outlined"
                        sx={{
                            height: '100%',
                            boxShadow: 3, // Adjust shadow intensity (1-24) or use a custom shadow
                            transition: 'transform 0.3s', // Smooth transition for hover effect
                            '&:hover': {
                                transform: 'scale(1.05)', // Scale effect on hover
                                boxShadow: 6, // Increase shadow on hover
                            },
                        }}
                    >
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                {content.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                {content.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                variant="contained"
                                color="info"
                                href={content.contentURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                component="a"
                                startIcon={<ViewAgenda/>}
                            >
                                View
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>     
              ))};
            </Grid>
          ) : (
            <Typography variant="h6" color="textSecondary" align="center">
                No recommendations available at the moment. Please check back later!
            </Typography>
          )}
      </Box>
  );

};

export default ContentList;