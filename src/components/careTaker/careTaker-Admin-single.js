// // import React, { useEffect, useState } from 'react';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import axios from '../../config/axios';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import Spinner from '../../utility/spinner';

// // export default function CareTakerAccount() {
// //     const { id } = useParams();
// //     const [careTaker, setCareTaker] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);
// //     const [userRole, setUserRole] = useState(null);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const fetchCareTaker = async () => {
// //             if (!id) {
// //                 setError('Invalid ID');
// //                 setLoading(false);
// //                 return;
// //             }
// //             try {
// //                 const response = await axios.get(`/careTaker/singlecareTaker/${id}`, {
// //                     headers: {
// //                         Authorization: ` ${localStorage.getItem('token')}`,
// //                     },
// //                 });
// //                 setCareTaker(response.data);
// //                 setLoading(false);
// //             } catch (err) {
// //                 console.error(err.message);
// //                 setError('Something went wrong');
// //                 setLoading(false);
// //             }
// //         };

// //         // const token = localStorage.getItem('token');
// //         // if (token) {
// //         //     const base64Payload = token.split('.')[1];
// //         //     const decodedPayload = JSON.parse(atob(base64Payload));
// //         //     setUserRole(decodedPayload.role);
// //         // }

// //         fetchCareTaker();
// //     }, [id]);

// //     const handleDelete = async () => {
// //         if (window.confirm("Are you sure you want to delete your profile?")) {
// //             try {
// //                 const response = await axios.delete(`/careTaker/${careTaker._id}`, {
// //                     headers: {
// //                         Authorization: `${localStorage.getItem('token')}`,
// //                     },
// //                 });

// //                 if (response.status === 200) {
// //                     toast.success("Profile deleted successfully.");
// //                     navigate('/single-caretaker');
// //                 }
// //             } catch (err) {
// //                 alert("Failed to delete profile. Please try again.");
// //                 console.error(err.message);
// //             }
// //         }
// //     };

// //     if (loading) return <Spinner />;
// //     if (error) return <div>{error}</div>;

// //     return (
// //         <div>
// //             <h2>CareTaker Details</h2>
// //             {careTaker ? (
// //                 <div className='care-taker-card'>
// //                     {careTaker.userId ? (
// //                         <>
// //                             <p>Username: <b>{careTaker.userId.username}</b></p>
// //                             <p>Email: {careTaker.userId.email}</p>
// //                             <p>Phone: {careTaker.userId.phoneNumber}</p>
// //                         </>
// //                     ) : (
// //                         <p>User Information not available</p>
// //                     )}
// //                     <p>Business Name: {careTaker.businessName}</p>
// //                     <p>Address: {careTaker.address}</p>
// //                     <p>Bio: {careTaker.bio}</p>
// //                     <div>
// //                         <h3>Services:</h3>
// //                         {careTaker.serviceCharges && careTaker.serviceCharges.length > 0 ? (
// //                             careTaker.serviceCharges.map((charge, index) => (
// //                                 <div key={index}>
// //                                     <p>Service Name: {charge.specialityName}</p>
// //                                     <p>Service Amount: {charge.amount}</p>
// //                                     <p>Service Time: {charge.time}</p>
// //                                 </div>
// //                             ))
// //                         ) : (
// //                             <p>No services available</p>
// //                         )}
// //                     </div>
// //                     <div>
// //                         <h3>Profile Photo</h3>
// //                         <img src={careTaker.photo} alt='Profile' style={{ maxWidth: '200px' }} />
// //                     </div>
// //                     <div>
// //                         <h3>Proof Document</h3>
// //                         <img src={careTaker.proof} alt='Proof Document' style={{ maxWidth: '200px' }} />
// //                     </div>
// //                     <div>
// //                     <button onClick={() => navigate(`/update-caretaker/${careTaker._id}`)}>Update your Profile</button>
// //                     <button onClick={handleDelete}>Delete your Profile</button>

// //                     <button onClick={()=> navigate(`/all-booking-caretaker`)}>View all My Booking</button>

// //                         {/* {userRole === 'careTaker' && (
// //                             <>
// //                                 <button onClick={() => navigate(`/create-booking/${careTaker._id}`)}>Book CareTaker</button>
// //                             </>
// //                         )}
// //                         {userRole === 'admin' && (
// //                             <button onClick={handleDelete}>Delete Profile</button>
// //                         )}
// //                         {userRole === 'careTaker' && (
// //                             <button onClick={() => navigate(`/create-caretaker`)}>Create Care-Taker Profile</button>
// //                         )}
// //                         {userRole === 'careTaker' && (
// //                             // <button onClick={() => navigate(`/update-caretaker/${careTaker._id}`)}>Update your Profile</button>
// //                         )} */}
// //                     </div>
// //                 ) : (
// //                 <div>
// //                     <p>No CareTaker profile found.</p>
// //                     <button onClick={() => navigate(`/create-caretaker`)}>Create Care-Taker Profile</button>
// //                 </div>
// //             ) : (
// //                 <div>
// //                     <p>No CareTaker profile found.</p>
// //                     {userRole === 'careTaker' && (
// //                         <button onClick={() => navigate(`/create-caretaker`)}>Create Care-Taker Profile</button>
// //                     )}
// //                 </div>
// //             )}
// //             <ToastContainer />
// //         </div>
// //     );
// // }

// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from '../../config/axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Spinner from '../../utility/spinner';

// export default function CareTakerAccount() {
//     const { id } = useParams();
//     const [careTaker, setCareTaker] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchCareTaker = async () => {
//             if (!id) {
//                 setError('Invalid ID');
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 const response = await axios.get(`/careTaker/single-care-taker`, {
//                     headers: {
//                         Authorization: `${localStorage.getItem('token')}`,
//                     },
//                 });
//                 setCareTaker(response.data);
//                 setLoading(false);
//             } catch (err) {
//                 console.error(err.message);
//                 setError('Something went wrong');
//                 setLoading(false);
//             }
//         };

//         fetchCareTaker();
//     }, [id]);

//     const handleDelete = async () => {
//         if (window.confirm("Are you sure you want to delete your account? Your account details will be lost permanently.")) {
//             try {
//                 const response = await axios.delete(`/careTaker/${careTaker._id}`, {
//                     headers: {
//                         Authorization: `${localStorage.getItem('token')}`,
//                     },
//                 });

//                 if (response.status === 200) {
//                     toast.success("Profile deleted successfully.");
//                     navigate('/single-caretaker');
//                 }
//             } catch (err) {
//                 alert("Failed to delete profile. Please try again.");
//                 console.error(err.message);
//             }
//         } else {
//             // User canceled the deletion
//             toast.info("Deletion canceled. Your profile is safe.");
//         }
//     };

//     if (loading) return <Spinner />;
//     if (error) return <div>{error}</div>;

//     return (
//         <div>
//             <h2>CareTaker Details</h2>
//             {careTaker ? (
//                 <div className='care-taker-card'>
//                     {careTaker.userId ? (
//                         <>
//                             <p>Username: <b>{careTaker.userId.username}</b></p>
//                             <p>Email: {careTaker.userId.email}</p>
//                             <p>Phone: {careTaker.userId.phoneNumber}</p>
//                         </>
//                     ) : (
//                         <p>User Information not available</p>
//                     )}
//                     <p>Business Name: {careTaker.businessName}</p>
//                     <p>Address: {careTaker.address}</p>
//                     <p>Bio: {careTaker.bio}</p>
//                     <div>
//                         <h3>Services:</h3>
//                         {careTaker.serviceCharges && careTaker.serviceCharges.length > 0 ? (
//                             careTaker.serviceCharges.map((charge, index) => (
//                                 <div key={index}>
//                                     <p>Service Name: {charge.specialityName}</p>
//                                     <p>Service Amount: {charge.amount}</p>
//                                     <p>Service Time: {charge.time}</p>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No services available</p>
//                         )}
//                     </div>
//                     <div>
//                         <h3>Profile Photo</h3>
//                         <img src={careTaker.photo} alt='Profile' style={{ maxWidth: '200px' }} />
//                     </div>
//                     <div>
//                         <h3>Proof Document</h3>
//                         <img src={careTaker.proof} alt='Proof Document' style={{ maxWidth: '200px' }} />
//                     </div>
//                     <div>
//                         <button onClick={() => navigate(`/update-caretaker/${careTaker._id}`)}>Update your Profile</button>
//                         <button onClick={handleDelete}>Delete your Profile</button>
//                         <button onClick={() => navigate(`/all-booking-caretaker`)}>View all My Booking</button>
//                     </div>
//                 </div>
//             ) : (
//                 <div>
//                     <p>No CareTaker profile found.</p>
//                     <button onClick={() => navigate(`/create-caretaker`)}>Create Care-Taker Profile</button>
//                 </div>
//             )}
//             <ToastContainer />
//         </div>
//     );
// }
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../utility/spinner';

export default function CTSingleAdminAccount() {
    const { id } = useParams();
    const [careTaker, setCareTaker] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCareTaker = async () => {
            if (!id) {
                setError('Invalid ID');
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`/careTaker/singlecareTaker/${id}`, {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                });
                setCareTaker(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err.message);
                setError('Something went wrong');
                setLoading(false);
            }
        };

        fetchCareTaker();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your account? Your account details will be lost permanently.")) {
            try {
                const response = await axios.delete(`/careTaker/${careTaker._id}`, {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                });

                if (response.status === 200) {
                    toast.success("Profile deleted successfully.");
                    navigate('/single-caretaker');
                }
            } catch (err) {
                alert("Failed to delete profile. Please try again.");
                console.error(err.message);
            }
        } else {
            // User canceled the deletion
            toast.info("Deletion canceled. Your profile is safe.");
        }
    };

    if (loading) return <Spinner />;
    if (error) return <div>{error}</div>;

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
                    <div>
                        <button onClick={handleDelete}>Delete CareTaker Profile</button>
                        
                    </div>
                </div>
            ) : (
                <div>
                    <p>No CareTaker profile found.</p>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}
