// import React, { useEffect, useState } from 'react';
// import axios from '../../config/axios';
// import { Link ,useParams} from 'react-router-dom';

// export default function CareTakerAll() {
//     //const {id}=useParams()
//   const [careTakers, setCareTakers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errors, setErrors] = useState(null);

//   useEffect(() => {
//     const fetchCareTakers = async () => {
//       try {
//         const response = await axios.get('/caretaker/showallverifiedcareTaker', {
//           headers: {
//             Authorization: localStorage.getItem('token'),
//           },
//         });
//         console.log(response.data);
//         setCareTakers(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.log(error.message);
//         setErrors(error);
//         setLoading(false);
//       }
//     };
//     fetchCareTakers();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (errors) return <div>{errors.message}</div>;

//   return (
//     <div>
//       <h2>Verified Caretakers List</h2>
//       {careTakers.map((ele) => (
//         <div key={ele._id} className="care-taker-card">
//           {ele.userId ? (
//             <>
//               <h2>{ele.userId.username}</h2>
//               <p>Email: {ele.userId.email}</p>
//               <p>Phone: {ele.userId.phoneNumber}</p>
//             </>
//           ) : (
//             <p>User Information not available</p>
//           )}
//           <p>Business Name: {ele.businessName}</p>
//           <p>Address: {ele.address}</p>
//           <p>Bio: {ele.bio}</p>
//           <div>
//             <h3>Services:</h3>
//             {ele.serviceCharges.map((charge, index) => (
//               <div key={index}>
//                 <p>Service Name: {charge.name}</p>
//                 <p>Service Amount: {charge.amount}</p>
//                 <p>Service Time: {charge.time}</p>
//               </div>
//             ))}
//           </div>
//           <div>
//             <h3>Profile Photo</h3>
//             <img src={ele.photo} alt="Profile" style={{ maxWidth: '200px' }} />
//           </div>
//           <div>
//             <h3>Proof Document</h3>
//             <img src={ele.proof} alt="Proof" style={{ maxWidth: '200px' }} />
//           </div>
//           {ele.userId && ele.userId._id && (
//             <Link to={`/caretaker-account/${ele._id}`}>View Details</Link>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import axios from '../../config/axios';
import { Container, Typography, Paper, Button, Avatar, List, ListItem, ListItemText, ListItemAvatar, Divider, Grid, IconButton, Pagination, PaginationItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';


export default function AllBookingCareTaker(){ 
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [view, setView] = useState('');
  const [page, setPage] = useState(1);
  const bookingsPerPage = 5;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/booking/allcaretaker-booking', {
            headers: { Authorization: localStorage.getItem('token') },
          });
        setBookings(response.data);
      } catch (error) {
        console.log(error)
        setError('Error fetching bookings.');
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

  const handleAcceptBooking = async () => {
    try {
      await axios.put(`/booking/accept-caretaker/${selectedBooking._id}`, {}, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setBookings(bookings.map(booking => booking._id === selectedBooking._id ? { ...booking, status: 'confirmed', Accepted: true } : booking));
      setSelectedBooking(null);
    } catch (error) {
      console.error('Error accepting booking:', error);
    }
  };

  const handleRejectBooking = async () => {
    try {
      await axios.put(`/booking/deny-caretaker/${selectedBooking._id}`, {}, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setBookings(bookings.map(booking => booking._id === selectedBooking._id ? { ...booking, status: 'cancelled', Accepted: false } : booking));
      setSelectedBooking(null);
    } catch (error) {
      console.error('Error rejecting booking:', error);
    }
  };

  const displayedBookings = bookings.slice((page - 1) * bookingsPerPage, page * bookingsPerPage);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>All Bookings</Typography>
      <Grid container spacing={3}>
      <Grid item xs={6}>
      {displayedBookings.map((booking) => (
        <Paper key={booking._id} style={{ padding: 20, marginBottom: 20 }}>
          <Typography variant="h6" gutterBottom>Booking for {booking.petId.petName} By {booking.userId.username}</Typography>
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
            <Button variant="contained" color="success" onClick={handleAcceptBooking} style={{ marginTop: 10 }}>Accept Booking</Button>
            <Button variant="contained" color="error" onClick={handleRejectBooking} style={{ marginTop: 10, marginLeft: 10 }}>Reject Booking</Button>
            <Divider style={{ margin: '20px 0' }} />
            <Button variant="contained" color="secondary" onClick={() => toggleView('petDetails')} style={{ marginRight: 10 }}>View Pet Details</Button>
            <Button variant="contained" color="secondary" onClick={() => toggleView('petParentDetails')}>View Pet Parent Details</Button>
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
            {view === 'petParentDetails' && (
              <Paper style={{ padding: 20, marginTop: 20 }}>
                <Typography variant="h6" gutterBottom>Pet Parent Details</Typography>
                <Typography variant="body1"><strong>User Name:</strong> {selectedBooking.userId.username}</Typography>
                <Typography variant="body1"><strong>User Email:</strong> {selectedBooking.userId.email}</Typography>
                <Typography variant="body1"><strong>Address:</strong> {selectedBooking.petparentId.address}</Typography>
                <Avatar src={selectedBooking.petparentId.photo} alt="Pet Parent" style={{ width: 100, height: 100 }} />
              </Paper>
            )}
          </Paper>
        </div>
      )}
      </Grid>
      </Grid>
    </Container>
  );
};
