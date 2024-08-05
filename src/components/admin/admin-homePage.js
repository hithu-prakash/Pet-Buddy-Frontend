import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import bgg from '../../photos/bgg.jpg'; // Correct path and extension

export default function Home() {
    const navigate = useNavigate();

    return (
        <Container
            maxWidth="md"
            sx={{
                py: 4,
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `url(${bgg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background for better readability
                }}
            >
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to PetBuddy
                </Typography>
                <Typography variant="h5" color="textSecondary" paragraph>
                    Your one-stop solution for all your pet care needs. Explore our services, manage your pets, and connect with pet parents.
                </Typography>
                <Box mt={4}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={() => navigate('/services')}
                            >
                                Explore Services
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                onClick={() => navigate('/pets')}
                            >
                                Manage Pets
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                onClick={() => navigate('/register-parents')}
                            >
                                Pet Parents
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}
