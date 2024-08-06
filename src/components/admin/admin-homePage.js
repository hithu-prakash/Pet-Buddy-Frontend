import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import { Container, Box, Typography, Paper, Button } from '@mui/material';

export default function Home() {
    const navigate = useNavigate();
    const [counts, setCounts] = useState({
        caretakers: 0,
        pets: 0,
        petParents: 0,
    });
    const [showCaretakerOptions, setShowCaretakerOptions] = useState(false);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const response = await axios.get('/api/admin/counts');
                setCounts(response.data);
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };

        fetchCounts();
    }, []);

    const handleCaretakerClick = () => {
        setShowCaretakerOptions(true);
    };

    return (
        <Container style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom>
                Welcome to PetBuddy
            </Typography>
            
            <Box display="flex" justifyContent="center" gap={2}>
                <Paper
                    elevation={3}
                    onClick={handleCaretakerClick}
                    style={{ padding: '20px', cursor: 'pointer', width: '200px' }}
                >
                    <Typography variant="h5">
                        Caretakers: {counts.caretakers}
                    </Typography>
                </Paper>
                <Paper
                    elevation={3}
                    onClick={() => navigate('/parent-all')}
                    style={{ padding: '20px', cursor: 'pointer', width: '200px' }}
                >
                    <Typography variant="h5">
                        Pet Parents: {counts.petParents}
                    </Typography>
                </Paper>
                <Paper
                    elevation={3}
                    onClick={() => navigate('/pet/showAll')}
                    style={{ padding: '20px', cursor: 'pointer', width: '200px' }}
                >
                    <Typography variant="h5">
                        Pets: {counts.pets}
                    </Typography>
                </Paper>
            </Box>
            
            {showCaretakerOptions && (
                <Box display="flex" justifyContent="center" gap={2} marginTop={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/caretaker-all')}
                    >
                        Verified Caretakers
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate('/careTaker-false')}
                    >
                        Unverified Caretakers
                    </Button>
                </Box>
            )}
        </Container>
    );
}
