import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchReviews from '../review/createReview';
import { Container, Typography, Card, CardContent, CircularProgress } from '@mui/material';

export default function ReviewList() {
  const dispatch = useDispatch();
  const reviewState = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  return (
    <Container>
      {reviewState.loading && <CircularProgress />}
      {reviewState.error && (
        <Typography color="error">
          Error: {reviewState.error}
        </Typography>
      )}
      {reviewState.reviews.map((review) => (
        <Card key={review._id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">
              Rating: {review.ratings}
            </Typography>
            <Typography>
              {review.description}
            </Typography>
            {review.photos && (
              <img
                src={review.photos}
                alt="Review"
                style={{ width: '100%', marginTop: '10px' }}
              />
            )}
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
