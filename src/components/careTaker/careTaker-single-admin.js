import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../config/axios';
import Spinner from '../../utility/spinner';
import StarRating from '../review/starRating'; // Adjust import path as necessary
import {
    Typography,
    Card,
    CardContent,
    CardMedia,
    Box,
    Button,
} from '@mui/material';

export default function CareTakerDetailsView() {
    const { id } = useParams();
    const [careTaker, setCareTaker] = useState(null);
    const [bookingDetails, setBookingDetails] = useState(null);
    const [ratings, setRatings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});
    const [showWarning, setShowWarning] = useState(false);
    const [showBookingDetails, setShowBookingDetails] = useState(false);

    useEffect(() => {
        const fetchCareTaker = async () => {
            if (!id) {
                setError({ fetch: 'Invalid ID' });
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`/careTaker/singlecareTaker/${id}`, {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                });
                setCareTaker(response.data);

                const bookingResponse = await axios.get(`/CTdetails/${id}`, {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                });
                setBookingDetails(bookingResponse.data);

                setLoading(false);
            } catch (err) {
                console.error(err.message);
                setError({ fetch: 'Something went wrong' });
                setLoading(false);
            }
        };

        const fetchRatings = async () => {
            try {
                const response = await axios.get(`/caretaker-ratings/${id}`, {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                });

                console.log('Fetched Ratings Data:', response.data);

                if (response.data.averageRating < 1.5) {
                    setShowWarning(true);
                }

                setRatings(response.data);
            } catch (error) {
                console.error('Fetch Ratings Error:', error.message);
                setError('Failed to fetch ratings');
            }
        };

        fetchCareTaker();
        fetchRatings();
    }, [id]);

    const handleSendWarning = async () => {
        try {
            await axios.post(`/send-warning/${id}`, {}, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                },
            });
            alert('Warning email sent successfully');
        } catch (error) {
            console.error('Send Warning Error:', error.message);
            alert('Failed to send warning email');
        }
    };

    if (loading) return <Spinner />;
    if (error.fetch) return <div>{error.fetch}</div>;

    return (
        <Card style={{ maxWidth: 600, margin: 'auto', marginTop: 20, padding: 16 }}>
            <CardContent>
                <Typography variant="h4" component="h2">
                    CareTaker Details
                </Typography>
                {careTaker ? (
                    <div>
                        {careTaker.userId ? (
                            <>
                                <Typography variant="h6">
                                    Username: <b>{careTaker.userId.username}</b>
                                </Typography>
                                <Typography variant="body1">Email: {careTaker.userId.email}</Typography>
                                <Typography variant="body1">Phone: {careTaker.userId.phoneNumber}</Typography>
                            </>
                        ) : (
                            <Typography variant="body1">User Information not available</Typography>
                        )}
                        <Typography variant="body1">Business Name: {careTaker.businessName}</Typography>
                        <Typography variant="body1">Address: {careTaker.address}</Typography>
                        <Typography variant="body1">Bio: {careTaker.bio}</Typography>
                        <div style={{ marginTop: 16 }}>
                            <Typography variant="h6">Services:</Typography>
                            {careTaker.serviceCharges && careTaker.serviceCharges.length > 0 ? (
                                careTaker.serviceCharges.map((charge, index) => (
                                    <Box key={index} my={1}>
                                        <Typography variant="body1">Service Name: {charge.specialityName}</Typography>
                                        <Typography variant="body1">Service Amount: {charge.amount}</Typography>
                                        <Typography variant="body1">Service Time: {charge.time}</Typography>
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body1">No services available</Typography>
                            )}
                        </div>
                        <CardMedia
                            style={{ height: 200, width: '100%', objectFit: 'contain' }}
                            image={careTaker.photo}
                            title="Profile Photo"
                        />
                        <CardMedia
                            style={{ height: 200, width: '100%', objectFit: 'contain' }}
                            image={careTaker.proof}
                            title="Proof Document"
                        />
                        {ratings && (
                            <div style={{ marginTop: 16 }}>
                                <Typography variant="h6">Rating Details</Typography>
                                <Typography variant="body1">Total Rating: {ratings.totalRating}</Typography>
                                <Typography variant="body1">Average Rating: {ratings.averageRating}</Typography>
                                <Typography variant="body1">Number of Reviews: {ratings.numberOfReviews}</Typography>
                            </div>
                        )}
                        {showWarning && (
                            <div style={{ marginTop: 16 }}>
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    onClick={handleSendWarning}
                                >
                                    Warn CareTaker
                                </Button>
                                <Typography variant="body1" style={{ color: 'red', marginTop: 16 }}>
                                    Warning: Average rating is below 1.5!
                                </Typography>
                            </div>
                        )}
                    </div>
                ) : (
                    <Typography variant="body1">No CareTaker profile found.</Typography>
                )}
            </CardContent>
        </Card>
    );
}
