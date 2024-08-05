import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { Container, Typography, Card, CardContent, CircularProgress, Grid } from '@mui/material';
import Rating from '@mui/material/Rating';

export default function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/all/review');
        setReviews(response.data);
        console.log(response.data)
      } catch (error) {
        setError('Error fetching reviews');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Reviews
      </Typography>
      <Grid container spacing={3}>
        {reviews.map((review) => (
          <Grid item xs={12} sm={6} md={4} key={review._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {review.userId.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {review.description}
                </Typography>
                <Rating value={review.ratings} readOnly />
                {review.photos && (
                  <img
                    src={review.photos}
                    alt="Review"
                    style={{ width: '100%', marginTop: '10px' }}
                  />
                )}
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Caretaker: {review.caretakerId.businessName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {/* Pet: {review.petId.petName} */}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {review.ratings}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};


