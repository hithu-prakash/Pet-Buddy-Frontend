import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { Link } from 'react-router-dom';
import StarRating from '../review/starRating'; // Adjust import path as necessary
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Grid,
  Button,
  Box
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified'; // Import a verification icon

const CareTakerVerifiedAll = () => {
  const [careTakers, setCareTakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  // Retrieve role from local storage
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    const fetchCareTakers = async () => {
      try {
        const response = await axios.get('/caretaker/showallverifiedcareTaker', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setCareTakers(response.data);
        setLoading(false);
      } catch (error) {
        setErrors(error);
        setLoading(false);
      }
    };
    fetchCareTakers();
  }, []);

  if (loading) return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Container>
  );

  if (errors) return (
    <Container sx={{ marginTop: 2 }}>
      <Alert severity="error">{errors.message}</Alert>
    </Container>
  );

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Verified Caretakers List
      </Typography>
      <Grid container spacing={3}>
        {careTakers.map((ele) => (
          <Grid item xs={12} sm={6} md={4} key={ele._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={ele.photo || 'default-image-url'}
                alt="Profile"
              />
              <CardContent>
                {ele.userId ? (
                  <>
                    <Typography variant="h6" gutterBottom>
                      {ele.userId.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Email: {ele.userId.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Phone: {ele.userId.phoneNumber}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    User Information not available
                  </Typography>
                )}
                <Typography variant="body1" gutterBottom>
                  Business Name: {ele.businessName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address: {ele.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bio: {ele.bio}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Services:
                </Typography>
                {ele.serviceCharges.map((charge, index) => (
                  <Typography key={index} variant="body2" color="text.secondary">
                    <div>Service Name: {charge.specialityName}</div>
                    <div>Service Amount: {charge.amount}</div>
                    <div>Service Time: {charge.time}</div>
                  </Typography>
                ))}
                <Typography variant="h6" gutterBottom>
                  Profile Photo
                </Typography>
                <CardMedia
                  component="img"
                  height="140"
                  image={ele.photo}
                  alt="Profile"
                />
                <Typography variant="h6" gutterBottom>
                  Proof Document
                </Typography>
                <CardMedia
                  component="img"
                  height="140"
                  image={ele.proof}
                  alt="Proof"
                />
                {ele.isVerified && (
                  <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                    <VerifiedIcon sx={{ color: 'blue', marginRight: 1 }} />
                    <Typography variant="body2" color="text.primary">Verified</Typography>
                  </Box>
                )}
                {ele.userId && ele.userId._id && userRole !== 'admin' && (
                  <Button
                    component={Link}
                    to={`/ctverified-single/${ele._id}`} // Updated URL pattern
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                  >
                    View Details
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CareTakerVerifiedAll;
