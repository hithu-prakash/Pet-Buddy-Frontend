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
  Dialog,
  DialogTitle,
  Box,
  DialogContent
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified'; // Import a verification icon

const CareTakerAll = () => {
  const [careTakers, setCareTakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCaretaker, setSelectedCaretaker] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

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

  const fetchBookingDetails = async (caretakerId) => {
    try {
      const response = await axios.get(`/CTdetails/${caretakerId}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      setBookingDetails(response.data);
    } catch (error) {
      setErrors(error);
    }
  };

  const handleOpenDialog = (caretaker) => {
    setSelectedCaretaker(caretaker);
    fetchBookingDetails(caretaker._id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setBookingDetails(null);
  };

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
                  <>
                    <Button
                      component={Link}
                      to={`/caretaker-account/${ele._id}`}
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: 2 }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleOpenDialog(ele)}
                      sx={{ marginTop: 2, marginLeft: 1 }}
                    >
                      Total Bookings
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent>
          {bookingDetails ? (
            <Box>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Average Rating:
                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 1 }}>
                  <StarRating
                    rating={bookingDetails.averageRating}
                    onChange={() => {}}
                    editable={false} // Pass editable=false to make it read-only
                  />
                </Box>
              </Typography>
              <Typography variant="h6">Average Ratings: {bookingDetails.averageRating.toFixed(1)}</Typography>
              <Typography variant="h6">
                Total Bookings: {bookingDetails.bookingsCount}
              </Typography>
            </Box>
          ) : (
            <CircularProgress />
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default CareTakerAll;
