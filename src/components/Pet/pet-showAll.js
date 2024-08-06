import React, { useState, useEffect } from 'react';
import axios from '../../config/axios';
import { Container, Card, CardContent, CardMedia, Typography, CircularProgress, Alert } from '@mui/material';

export default function ShowAllPets() {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get('/pet/showAll', {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                });
                setPets(response.data);
            } catch (error) {
                console.error('Error fetching pets:', error);
                setError('Failed to fetch pets');
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>All Pets</Typography>
            {pets.length > 0 ? (
                pets.map(pet => (
                    <Card key={pet._id} sx={{ marginBottom: 2 }}>
                        <CardMedia
                            component="img"
                            height="150"
                            image={pet.petPhoto || 'default-image-url'}
                            alt="Pet Photo"
                            sx={{ width: 'auto', marginBottom: 2 }}
                        />
                        <CardContent>
                            <Typography variant="h5" gutterBottom>{pet.petName}</Typography>
                            <Typography variant="body1" gutterBottom><strong>Age:</strong> {new Date(pet.age).toLocaleDateString()}</Typography>
                            <Typography variant="body1" gutterBottom><strong>Gender:</strong> {pet.gender}</Typography>
                            <Typography variant="body1" gutterBottom><strong>Category:</strong> {pet.categories}</Typography>
                            <Typography variant="body1" gutterBottom><strong>Breed:</strong> {pet.breed}</Typography>
                            <Typography variant="body1" gutterBottom><strong>Weight:</strong> {pet.weight}</Typography>
                            <Typography variant="body1" gutterBottom><strong>Vaccinated:</strong> {pet.vaccinated ? 'Yes' : 'No'}</Typography>
                            <Typography variant="body1" gutterBottom><strong>Medication:</strong></Typography>
                            {pet.medication.map(med => (
                                <Typography key={med._id} variant="body2" gutterBottom>
                                    - {med.medicationName}: {med.description} (Dose: {med.dose}, Due Date: {new Date(med.dueDate).toLocaleDateString()})
                                </Typography>
                            ))}
                            <Typography variant="body1" gutterBottom><strong>Reminders:</strong></Typography>
                            {pet.reminders.map(rem => (
                                <Typography key={rem._id} variant="body2" gutterBottom>
                                    - {rem.title}: {rem.note} (Date: {new Date(rem.date).toLocaleDateString()})
                                </Typography>
                            ))}
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography>No pets found.</Typography>
            )}
        </Container>
    );
}
