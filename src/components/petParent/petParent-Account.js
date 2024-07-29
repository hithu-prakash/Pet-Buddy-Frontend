import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { useParams } from 'react-router-dom';

export default function PetParentAccount() {
    const [petParent, setPetParent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPetParent = async () => {
            try {
                const response = await axios.get('/petParent/oneParent', {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
                console.log(response.data)
                setPetParent(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchPetParent();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Pet Parent Details</h2>
            {petParent ? (
                <div>
                    <h3>username:{petParent.userId.username}</h3>
                    <p>Email: {petParent.userId.email}</p>
                    <p>Phone: {petParent.userId.phoneNumber}</p>
                    <p>Address: {petParent.address}</p>
                    <div>
                        <h3>Profile Photo</h3>
                        <img src={petParent.parentPhoto} alt='Profile' style={{ maxWidth: '200px' }} />
                    </div>
                    <div>
                        <h3>Proof Photo</h3>
                        <img src={petParent.proof} alt='Profile' style={{ maxWidth: '200px' }} />
                    </div>
                </div>
            ) : (
                <div>Pet Parent not found</div>
            )}
        </div>
    );
}

