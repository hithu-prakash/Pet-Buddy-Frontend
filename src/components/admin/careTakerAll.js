import React, { useState, useEffect } from 'react';
import axios from '../../config/axios'; // Adjust based on your axios setup
import { Container, Typography, Grid, Card, CardContent, CardMedia, CircularProgress, Alert, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CaretakerList = () => {
  const [caretakers, setCaretakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    const fetchCaretakers = async () => {
      try {
        const response = await axios.get('/api/admin/caretakers');
        setCaretakers(response.data);
      } catch (err) {
        setError('Something went wrong while fetching caretakers.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCaretakers();
  }, []);

  const handleVerifyCaretaker = (id) => {
    navigate(`/caretaker-single/${id}`); // Navigate to the caretaker detail page
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ marginTop: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Unverified Caretakers
      </Typography>
      <Grid container spacing={3}>
        {caretakers.map(caretaker => (
          <Grid item xs={12} sm={6} md={4} key={caretaker._id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={caretaker.photo || 'default-image-url'}
                alt={caretaker.businessName}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {caretaker.businessName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address: {caretaker.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bio: {caretaker.bio}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {caretaker.serviceCharges.map((charge, index) => (
                    <div key={index}>
                      Speciality: {charge.specialityName}, Amount: {charge.amount}, Time: {charge.time}
                    </div>
                  ))}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleVerifyCaretaker(caretaker._id)}
                >
                  Verify
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CaretakerList;
