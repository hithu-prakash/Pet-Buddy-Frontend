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
  DialogContent,
  DialogActions,
} from '@mui/material';

const CareTakerAll = () => {
  const [careTakers, setCareTakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCaretaker, setSelectedCaretaker] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [caretakerToVerify, setCaretakerToVerify] = useState(null);

  // Retrieve role from local storage
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    const fetchCareTakers = async () => {
      try {
        const response = await axios.get('/api/admin/caretakers', {
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

  const handleVerifyCaretaker = async (caretakerId) => {
    setCaretakerToVerify(caretakerId);
    setConfirmOpen(true);
  };

  const handleConfirmVerify = async () => {
    try {
      await axios.put(`/api/admin/verify-caretaker/${caretakerToVerify}`, {}, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      // Refetch caretaker list
      const response = await axios.get('/api/admin/caretakers', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      setCareTakers(response.data);
      setConfirmOpen(false);
    } catch (error) {
      setErrors(error);
    }
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
    setCaretakerToVerify(null);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (errors) {
    return (
      <Container sx={{ marginTop: 2 }}>
        <Alert severity="error">{errors.message}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        UnVerified Caretakers List
      </Typography>
      <Grid container spacing={3}>
        {careTakers.map((caretaker) => (
          <Grid item xs={12} sm={6} md={4} key={caretaker._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={caretaker.photo || 'default-image-url'}
                alt="Profile"
              />
              <CardContent>
                {caretaker.userId ? (
                  <>
                    <Typography variant="h6" gutterBottom>
                      {caretaker.userId.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Email: {caretaker.userId.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Phone: {caretaker.userId.phoneNumber}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    User Information not available
                  </Typography>
                )}
                <Typography variant="body1" gutterBottom>
                  Business Name: {caretaker.businessName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address: {caretaker.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bio: {caretaker.bio}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Services:
                </Typography>
                {caretaker.serviceCharges.map((charge, index) => (
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
                  image={caretaker.photo}
                  alt="Profile"
                />
                <Typography variant="h6" gutterBottom>
                  Proof Document
                </Typography>
                <CardMedia
                  component="img"
                  height="140"
                  image={caretaker.proof}
                  alt="Proof"
                />
                {caretaker.userId && caretaker.userId._id && userRole !== 'admin' && (
                  <>
                    <Button
                      component={Link}
                      to={`ctverified-single/${caretaker._id}`}
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: 2 }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleVerifyCaretaker(caretaker._id)}
                      sx={{ marginTop: 2, marginLeft: 1 }}
                    >
                      Verify
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
              {bookingDetails.averageRating && (
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
              )}
              <Typography variant="h6">
                Total Bookings: {bookingDetails.bookingsCount}
              </Typography>
            </Box>
          ) : (
            <CircularProgress />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Verify Caretaker</DialogTitle>
        <DialogContent>
          Are you sure you want to verify this caretaker?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose}>Cancel</Button>
          <Button onClick={handleConfirmVerify} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CareTakerAll;
