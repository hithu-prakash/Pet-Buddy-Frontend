import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

export default function HappyParents() {
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Register Parents Happy with Our Service
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    We are thrilled to have parents who are satisfied with our services. Thank you for being a part of the PetBuddy family!
                </Typography>
            </Paper>
        </Container>
    );
}
