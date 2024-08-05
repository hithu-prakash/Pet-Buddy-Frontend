import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert } from '@mui/material';
import axios from '../../config/axios'; // Adjust the path according to your project structure

export default function PetsList() {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get('/api/admin/pets');
                setPets(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch pets');
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Pets List
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Pet Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Breed</TableCell>
                            <TableCell>Photo</TableCell>
                            <TableCell>Owner</TableCell>
                           
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pets.map((pet) => (
                            <TableRow key={pet._id}>
                                <TableCell>{pet.petId && pet.petId.petName}</TableCell>
                                <TableCell>{pet.petId && pet.petId.age}</TableCell>
                                <TableCell>{pet.petId && pet.petId.gender}</TableCell>
                                <TableCell>{pet.petId && pet.petId.breed}</TableCell>
                                <TableCell>
                                    {pet.petId && pet.petId.petPhoto && (
                                        <img src={pet.petId.petPhoto} alt="Pet" style={{ width: '100px', height: 'auto' }} />
                                    )}
                                </TableCell>
                                <TableCell>{pet.userId && pet.userId.username}</TableCell>
                                <TableCell>
                                    {pet.petParentId && pet.petParentId.parentPhoto && (
                                        <img src={pet.petParentId.parentPhoto} alt="Parent" style={{ width: '100px', height: 'auto' }} />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}