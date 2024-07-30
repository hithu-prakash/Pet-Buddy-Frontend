import React, { useEffect, useState } from 'react';

import axios from '../../config/axios';

export default function CareTakerAccount() {

    const [careTaker, setCareTaker] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCareTaker = async () => {
            try {
                const response = await axios.get(`/careTaker/singlecareTaker`, {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
                setCareTaker(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error.message);
                setError('Something went wrong');
                setLoading(false);
            }
        };

        fetchCareTaker();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>CareTaker Details</h2>
            {careTaker ? (
                <div className='care-taker-card'>
                    {careTaker.userId ? (
                        <>
                            <h2>Username:{careTaker.userId.username}</h2>
                            <p>Email: {careTaker.userId.email}</p>
                            <p>Phone: {careTaker.userId.phoneNumber}</p>
                        </>
                    ) : (
                        <p>User Information not available</p>
                    )}
                    <p>Business Name: {careTaker.businessName}</p>
                    <p>Address: {careTaker.address}</p>
                    <p>Bio: {careTaker.bio}</p>
                    <div>
                        <h3>Services:</h3>
                        {careTaker && careTaker.serviceCharges && careTaker.serviceCharges.map((charge, index) => (
                            <div key={index}>
                                <p>Service Name: {charge.specialityName}</p>
                                <p>Service Amount: {charge.amount}</p>
                                <p>Service Time: {charge.time}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h3>Profile Photo</h3>
                        <img src={careTaker.photo} alt='Profile' style={{ maxWidth: '200px' }} />
                    </div>
                    <div>
                        <h3>Proof Document</h3>
                        <img src={careTaker.proof} alt='Profile' style={{ maxWidth: '200px' }} />
                    </div>
                </div>
            ) : (
                <div>No CareTaker found</div>
            )}
        </div>
    );
};

