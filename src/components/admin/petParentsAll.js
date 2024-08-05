import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box } from '@mui/material';
import axios from '../../config/axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PetParentsList = () => {
    const [petParents, setPetParents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchPetParents = async () => {
            try {
                const response = await axios.get('/api/admin/petparents');
                setPetParents(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch pet parents');
                setLoading(false);
            }
        };

        fetchPetParents();
    }, []);

    const handleRowClick = (id) => {
        navigate(`/petparent/${id}`); // Navigate to the detailed view
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Pet Parents List
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Address</TableCell>
                            <TableCell>Parent Photo</TableCell>
                            <TableCell>Proof</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {petParents.map((parent) => (
                            <TableRow key={parent._id} onClick={() => handleRowClick(parent._id)} style={{ cursor: 'pointer' }}>
                                <TableCell>{parent.address}</TableCell>
                                <TableCell>
                                    <img src={parent.parentPhoto} alt="Parent" style={{ width: '100px', height: 'auto' }} />
                                </TableCell>
                                <TableCell>
                                    <img src={parent.proof} alt="Proof" style={{ width: '100px', height: 'auto' }} />
                                </TableCell>
                                <TableCell>{parent.userId.username}</TableCell>
                                <TableCell>{parent.userId.email}</TableCell>
                                <TableCell>{parent.userId.phoneNumber}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default PetParentsList;
