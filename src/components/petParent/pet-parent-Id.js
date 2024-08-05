import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, Card, CardContent, CardMedia, CircularProgress, Alert } from '@mui/material';
import axios from '../../config/axios';
import { useParams, useNavigate } from 'react-router-dom'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PetParentId() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [petParent, setPetParent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPetParent = async () => {
            try {
                const response = await axios.get(`/petParent/single-parent/${id}`, {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                });
                setPetParent(response.data);
            } catch (error) {
                console.error('Error fetching pet parent details:', error);
                setError('Failed to fetch pet parent details');
            } finally {
                setLoading(false);
            }
        };

        fetchPetParent();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this pet parent?')) {
            try {
                await axios.delete(`/petParent/delete/${id}`, {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                });
                toast.success('PetParent deleted successfully');
                setTimeout(() => navigate('/parent-all'), 2000); // Redirect after showing the toast
            } catch (error) {
                console.error('Error deleting pet parent:', error);
                setError('Failed to delete pet parent');
            }
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container>
            {petParent ? (
                <Card>
                    <CardMedia
                        component="img"
                        height="150" // Set to medium size
                        image={petParent.parentPhoto || 'default-image-url'}
                        alt="Parent Photo"
                        sx={{ width: 'auto', marginBottom: 2 }} // Adjust width and margin
                    />
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            {petParent.address}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Username:</strong> {petParent.userId.username}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Email:</strong> {petParent.userId.email}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Phone Number:</strong> {petParent.userId.phoneNumber}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Proof:</strong>
                        </Typography>
                        <CardMedia
                            component="img"
                            height="150" // Set to medium size
                            image={petParent.proof || 'default-image-url'}
                            alt="Proof Photo"
                            sx={{ width: 'auto' }} // Adjust width
                        />
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDelete}
                            sx={{ marginTop: 2 }}
                        >
                            Delete
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <Typography>No data available</Typography>
            )}
            <ToastContainer />
        </Container>
    );
}
