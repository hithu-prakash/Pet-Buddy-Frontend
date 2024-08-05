import React, { useState, useEffect } from 'react';
import axios from '../../config/axios';
import './booking.css'; 
import { Container, Typography, Paper, Button, Avatar, List, ListItem, ListItemText, ListItemAvatar, Divider, Grid, IconButton, Pagination, PaginationItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import NewReleasesRoundedIcon from '@mui/icons-material/NewReleasesRounded';

export default function AllBooking () {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [view, setView] = useState('');
  const [page, setPage] = useState(1);
  const bookingsPerPage = 5;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/booking-history-petparent', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Could not fetch booking data.');
      }
    };

    fetchBookings();
  }, []);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!bookings.length) return <Typography>Loading...</Typography>;

  const toggleView = (viewName) => {
    setView(prevView => (prevView === viewName ? '' : viewName));
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseDetails = () => {
    setSelectedBooking(null);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const displayedBookings = bookings.slice((page - 1) * bookingsPerPage, page * bookingsPerPage);
   /*const { date, userId, caretakerId, petId, petparentId, totalAmount, serviceName, status, bookingDurationInHours } = bookings;*/

  return (
    <Container>
    {error && <p className="error">{error}</p>}
    {bookings.length > 0 ? (
    <>
    <Typography variant="h4" gutterBottom>Bookings History</Typography>
    <Grid container spacing={3}>
    <Grid item xs={6}>
    {displayedBookings.map((booking) => (
      <Paper key={booking._id} style={{ padding: 20, marginBottom: 20 }}>
        <Typography variant="h6" gutterBottom>Booking for {booking.petId.petName}</Typography>
        <Typography variant="body1"><strong>Service Name:</strong> {booking.specialityName}</Typography>
        <Typography variant="body1"><strong>Total Amount:</strong> ₹{booking.totalAmount.toFixed(2)}</Typography>
        <Typography variant="body1"><strong>Booking Duration:</strong> {booking.bookingDurationInHours.toFixed(2)} hours</Typography>
        <Typography variant="body1"><strong>Status:</strong> {booking.status}</Typography>
        <Button variant="contained" color="primary" onClick={() => handleViewDetails(booking)} style={{ marginRight: 10 }}>View Details</Button>
      </Paper>
    ))}
    <Pagination
      count={Math.ceil(bookings.length / bookingsPerPage)}
      page={page}
      onChange={handleChangePage}
      renderItem={(item) => (
        <PaginationItem
          slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
          {...item}
        />
      )}
    />
    </Grid>
    <Grid item xs={6}>
    {selectedBooking && (
      <div>
        <Paper style={{ padding: 20, marginTop: 20, position: 'relative' }}>
          <IconButton
            onClick={handleCloseDetails}
            style={{ position: 'absolute', top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>Service Details</Typography>
          <Typography variant="body1"><strong>Service Name:</strong> {selectedBooking.specialityName}</Typography>
          <Typography variant="body1"><strong>Start Time:</strong> {new Date(selectedBooking.date.startTime).toLocaleString()}</Typography>
          <Typography variant="body1"><strong>End Time:</strong> {new Date(selectedBooking.date.endTime).toLocaleString()}</Typography>
          <Typography variant="body1"><strong>Total Amount:</strong> ₹{selectedBooking.totalAmount.toFixed(2)}</Typography>
          <Typography variant="body1"><strong>Booking Duration:</strong> {selectedBooking.bookingDurationInHours.toFixed(2)} hours</Typography>
          <Typography variant="body1"><strong>Status:</strong> {selectedBooking.status}</Typography>
          <Button variant="contained" color="success"  style={{ marginTop: 10 }}>MakePayment</Button>
          <Divider style={{ margin: '20px 0' }} />
          <Button variant="contained" color="secondary" onClick={() => toggleView('petDetails')} style={{ marginRight: 10 }}>View Pet Details</Button>
          <Button variant="contained" color="secondary" onClick={() => toggleView('careTakerDetails')}>View Care-Taker Details</Button>
          {view === 'petDetails' && (
            <Paper style={{ padding: 20, marginTop: 20 }}>
              <Typography variant="h6" gutterBottom>Pet Details</Typography>
              <Typography variant="body1"><strong>Pet Name:</strong> {selectedBooking.petId.petName}</Typography>
              <Typography variant="body1"><strong>Age:</strong> {selectedBooking.petId.age}</Typography>
              <Typography variant="body1"><strong>Gender:</strong> {selectedBooking.petId.gender}</Typography>
              <Typography variant="body1"><strong>Category:</strong> {selectedBooking.petId.category}</Typography>
              <Typography variant="body1"><strong>Breed:</strong> {selectedBooking.petId.breed}</Typography>
              <Typography variant="body1"><strong>Weight:</strong> {selectedBooking.petId.weight}</Typography>
              <Avatar src={selectedBooking.petId.petPhoto} alt="Pet" style={{ width: 100, height: 100 }} />
            </Paper>
          )}
          {view === 'careTakerDetails' && (
            <Paper style={{ padding: 20, marginTop: 20 }}>
              <Typography variant="h6" gutterBottom>Care-Taker Details</Typography>
              <Typography variant="body1"><strong>Business Name:</strong> {selectedBooking.caretakerId.businessName}</Typography>
              <Typography variant="body1">
                      <strong>Verified By Admin:</strong> 
                      {selectedBooking.caretakerId.isVerified ? 
                        <VerifiedRoundedIcon color="primary" style={{ marginLeft: 10 }} /> : 
                        <NewReleasesRoundedIcon color="error" style={{ marginLeft: 10 }} />}
                    </Typography>
              <Typography variant="body1"><strong>Address:</strong> {selectedBooking.caretakerId.address}</Typography>
              <Typography variant="body1"><strong>Bio:</strong> {selectedBooking.caretakerId.bio}</Typography>
              <Typography variant="body1"><strong>Service Charges:</strong> {selectedBooking.caretakerId.serviceCharges.map(charge => `${charge.specialityName}: ₹${charge.amount}`).join(', ')}</Typography>
              <Avatar src={selectedBooking.caretakerId.photo} alt="Care-Taker" style={{ width: 100, height: 100 }} />
            </Paper>
          )}
        </Paper>
      </div>
    )}
    </Grid>
    </Grid>
    </>
    ) : (
        <p>No bookings found.</p>
      )}
  </Container>
    );
};

