import React, { useEffect, useState } from 'react';
import axios from '../../config/axios'; // Adjust path as needed
import { useParams, useLocation, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Button,
  Rating,
} from '@mui/material';

export default function SingleReviews() {
  const { reviewId } = useParams();
  const location = useLocation();
  const updatedReview = location.state && location.state.updatedReview;

  const [reviews, setReviews] = useState([]);
  const [ratingsData, setRatingsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [caretakerId, setCaretakerId] = useState(null); // Add state to hold caretakerId
  const [isUpdated, setIsUpdated] = useState(false); // Add state to track if review is updated

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch review details to get caretakerId
        const reviewResponse = await axios.get(`/review/${reviewId}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        setReviews([reviewResponse.data]);
        setCaretakerId(reviewResponse.data.caretakerId._id); // Extract caretakerId from review

        // Fetch ratings data using caretakerId
        const ratingsResponse = await axios.get(`/caretaker-ratings/${reviewResponse.data.caretakerId._id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setRatingsData(ratingsResponse.data);

        // Check if review is updated
        if (updatedReview) {
          setIsUpdated(true);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    if (reviewId) {
      fetchData();
    } else {
      setError('Review ID is missing or invalid');
      setLoading(false);
    }
  }, [reviewId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Reviews for Caretaker
      </Typography>
      {ratingsData && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Total Ratings: {ratingsData.totalRating}</Typography>
            <Typography variant="h6">Average Rating: {ratingsData.averageRating}</Typography>
            <Rating value={ratingsData.averageRating} readOnly precision={0.1} />
            <Typography variant="body2">Number of Reviews: {ratingsData.numberOfReviews}</Typography>
            <Typography variant="body2">Number of Pet Parents: {ratingsData.numberOfParents}</Typography>
          </CardContent>
        </Card>
      )}
      {updatedReview && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Updated Review</Typography>
            <Typography variant="body2">{updatedReview.description}</Typography>
            <Rating value={updatedReview.ratings} readOnly />
          </CardContent>
        </Card>
      )}
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
                  Pet: {review.petId.petName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {review.ratings}
                </Typography>
                {!isUpdated && (
                  <Button
                    variant="outlined"
                    component={Link}
                    to={`/update-review/${review._id}`}
                  >
                    Update
                  </Button>
                )}
                           </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}