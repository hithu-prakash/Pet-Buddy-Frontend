import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../config/axios';
import { Container, Typography, Button, Paper, Avatar, List, ListItem, ListItemText} from '@mui/material';

export default function BookingSingleDetails() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  const [view, setView] = useState('');

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`/booking/singlebooking/${id}`);
        setBooking(response.data);
      } catch (error) {
        setError('Error fetching booking details.');
      }
    };
    fetchBookingDetails();
  }, [id]);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!booking) return <Typography>Loading...</Typography>;

  const { date, userId, caretakerId, petId, petparentId, totalAmount, serviceName, status, bookingDurationInHours, Accepted } = booking;

  const toggleView = (viewName) => {
    setView(prevView => (prevView === viewName ? '' : viewName));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Booking Details</Typography>
      <Paper style={{ padding: 20, marginBottom: 20 }}>
        <Typography variant="h6" gutterBottom><strong>Service Details</strong></Typography>
        <Typography variant="body1"><strong>Service Name:</strong> {specialityName}</Typography>
        <Typography variant="body1"><strong>Start Time:</strong> {new Date(date.startTime).toLocaleString()}</Typography>
        <Typography variant="body1"><strong>End Time:</strong> {new Date(date.endTime).toLocaleString()}</Typography>
        <Typography variant="body1"><strong>Total Amount:</strong> ₹{totalAmount}</Typography>
        <Typography variant="body1"><strong>Booking Duration:</strong> {bookingDurationInHours} hours</Typography>
        <Typography variant="body1"><strong>Status:</strong> {status}</Typography>
        <Typography variant="body1"><strong>Booking Acceptance:</strong> {Accepted ? 'Accepted' : 'Denied'}</Typography>
      </Paper>
     
      <Button variant="contained" color="primary" onClick={() => alert('Payment can be done only when the booking is accepted.')} style={{ marginRight: 10 }}>Make Payment</Button>
      
      <Button variant="contained" color="secondary" onClick={() => toggleView('petDetails')} style={{ marginRight: 10 }}>View Pet Details</Button>
      <Button variant="contained" color="secondary" onClick={() => toggleView('careTakerDetails')}>View CareTaker Details</Button>
      {view === 'petDetails' && (
        <Paper style={{ padding: 20, marginTop: 20 }}>
          <Typography variant="h6" gutterBottom>Pet Details</Typography>
          <Typography variant="body1"><strong>Pet Name:</strong> {petId.petName}</Typography>
          <Typography variant="body1"><strong>Age:</strong> {petId.age}</Typography>
          <Typography variant="body1"><strong>Gender:</strong> {petId.gender}</Typography>
          <Typography variant="body1"><strong>Category:</strong> {petId.category}</Typography>
          <Typography variant="body1"><strong>Breed:</strong> {petId.breed}</Typography>
          <Typography variant="body1"><strong>Weight:</strong> {petId.weight}</Typography>
          <Avatar src={petId.petPhoto} alt="Pet" style={{ width: 100, height: 100 }} />
        </Paper>
      )}
      {view === 'careTakerDetails' && (
        <Paper style={{ padding: 20, marginTop: 20 }}>
          <Typography variant="h6" gutterBottom>CareTaker Details</Typography>
          <Typography variant="body1"><strong>Business Name:</strong> {caretakerId.businessName}</Typography>
          <Typography variant="body1"><strong>Address:</strong> {caretakerId.address}</Typography>
          <Typography variant="body1"><strong>Bio:</strong> {caretakerId.bio}</Typography>
          <Typography variant="body1"><strong>Verified By Admin:</strong> {caretakerId.isVerified ? 'Yes' : 'No'}</Typography>
          <Avatar src={caretakerId.photo} alt="CareTaker" style={{ width: 100, height: 100 }} />
          <Avatar src={caretakerId.proof} alt="CareTaker Proof" style={{ width: 100, height: 100, marginTop: 10 }} />
          <Typography variant="h6" gutterBottom>Service Charges</Typography>
          <List>
            {caretakerId.serviceCharges.map(charge => (
              <ListItem key={charge._id}>
                <ListItemText primary={`${charge.specialityName}: ₹${charge.amount} (for ${charge.time} hours)`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
};

