import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../utility/spinner';

export default function CareTakerAccount() {
    const { id } = useParams(); // Get the params object
    const [careTaker, setCareTaker] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({}); // Initialize as an empty object
    const [userRole, setUserRole] = useState(null); // State to hold user role
    const navigate = useNavigate();

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
                        Authorization: `${localStorage.getItem('token')}`, // Ensure token format is correct
                    },
                });
                setCareTaker(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err.message);
                setError({ fetch: 'Something went wrong' });
                setLoading(false);
            }
        };

        // Decode the token to get the user role
        const token = localStorage.getItem('token');
        if (token) {
            const base64Payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(base64Payload));
            setUserRole(decodedPayload.role);  // Assuming role is stored in the token
        }

        fetchCareTaker();
    }, [id]); // Add id as a dependency to useEffect

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your profile?")) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.delete(`/careTaker/${careTaker._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Ensure token format is correct
                    },
                });

                if (response.status === 200) {
                    toast.success("Profile deleted successfully.");
                    alert("Profile deleted successfully.");
                    setCareTaker(null); // Set to null instead of an empty string
                    navigate('/single-caretaker'); // Redirect after successful deletion
                }
            } catch (err) {
                alert("Failed to delete profile. Please try again.");
                console.error(err.message);
            }
        }
    };

    if (loading) return <Spinner />;
    if (error.fetch) return <div>{error.fetch}</div>;

    return (
        <div>
            <h2>CareTaker Details</h2>
            {careTaker ? (
                <div className='care-taker-card'>
                    {careTaker.userId ? (
                        <>
                            <p>Username: <b>{careTaker.userId.username}</b></p>
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
                        {careTaker.serviceCharges && careTaker.serviceCharges.length > 0 ? (
                            careTaker.serviceCharges.map((charge, index) => (
                                <div key={index}>
                                    <p>Service Name: {charge.specialityName}</p>
                                    <p>Service Amount: {charge.amount}</p>
                                    <p>Service Time: {charge.time}</p>
                                </div>
                            ))
                        ) : (
                            <p>No services available</p>
                        )}
                    </div>
                    <div>
                        <h3>Profile Photo</h3>
                        <img src={careTaker.photo} alt='Profile' style={{ maxWidth: '200px' }} />
                    </div>
                    <div>
                        <h3>Proof Document</h3>
                        <img src={careTaker.proof} alt='Proof Document' style={{ maxWidth: '200px' }} />
                    </div>
                    {careTaker.userId && (userRole === 'petParent' || userRole === 'admin') ? (
                        <>
                            <button onClick={() => navigate(`/update-caretaker/${careTaker._id}`)}>Update your Profile</button>
                            <button onClick={handleDelete}>Delete your Profile</button>
                            <button onClick={() => navigate(`/create-booking/${careTaker._id}`)}>Book CareTaker</button>
                        </>
                    ) : (
                        <button onClick={() => navigate(`/create-booking/${careTaker._id}`)}>Book CareTaker</button>
                    )}
                </div>
            ) : (
                <div>
                    <p>No CareTaker profile found.</p>
                    <button onClick={() => navigate(`/create-caretaker`)}>Create Care-Taker Profile</button>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}
