// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from '../../config/axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//     Button,
//     Card,
//     CardContent,
//     CardMedia,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogContentText,
//     DialogTitle,
//     Typography,
// } from '@mui/material';

// const CTVerifyedSingle = () => {
//     const { id } = useParams();
//     const [careTaker, setCareTaker] = useState(null);
//     const [ratings, setRatings] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [verifyCareTaker, setVerifyCareTaker] = useState(false);
//     const [deleteCareTaker, setDeleteCareTaker] = useState(false);
//     const [showWarning, setShowWarning] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchCareTaker = async () => {
//             try {
//                 const response = await axios.get(`/careTaker/singlecareTaker/${id}`, {
//                     headers: {
//                         Authorization: localStorage.getItem('token'),
//                     },
//                 });

//                 console.log('Fetched CareTaker Data:', response.data);

//                 if (response.data) {
//                     setCareTaker(response.data);
//                 } else {
//                     setError('CareTaker not found');
//                 }
//             } catch (error) {
//                 console.error('Fetch CareTaker Error:', error.message);
//                 setError('Something went wrong');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const fetchRatings = async () => {
//             try {
//                 const response = await axios.get(`/caretaker-ratings/${id}`, {
//                     headers: {
//                         Authorization: localStorage.getItem('token'),
//                     },
//                 });

//                 console.log('Fetched Ratings Data:', response.data);

//                 if (response.data.averageRating < 1.5) {
//                     setShowWarning(true);
//                 }

//                 setRatings(response.data);
//             } catch (error) {
//                 console.error('Fetch Ratings Error:', error.message);
//                 setError('Failed to fetch ratings');
//             }
//         };

//         fetchCareTaker();
//         fetchRatings();
//     }, [id]);

//     const handleVerify = async () => {
//         try {
//             await axios.put(`/api/admin/verify-caretakers/${id}`, {}, {
//                 headers: {
//                     Authorization: localStorage.getItem('token'),
//                 },
//             });
//             toast.success('CareTaker verified successfully!');
//             setCareTaker(prevState => ({ ...prevState, isVerified: true }));
//             setVerifyCareTaker(false);
//             navigate('/careTaker-false');
//         } catch (error) {
//             console.error('Verify CareTaker Error:', error.message);
//             toast.error('Failed to verify CareTaker.');
//             setVerifyCareTaker(false);
//         }
//     };

//     const handleDelete = async () => {
//         try {
//             await axios.delete(`/careTaker/${id}`, {
//                 headers: {
//                     Authorization: localStorage.getItem('token'),
//                 },
//             });
//             toast.success('CareTaker deleted successfully!');
//             setDeleteCareTaker(false);
//             navigate('/careTaker-false');
//         } catch (error) {
//             console.error('Delete CareTaker Error:', error.message);
//             toast.error('Failed to delete CareTaker.');
//             setDeleteCareTaker(false);
//         }
//     };

//     const handleVerifyDialogOpen = () => {
//         setVerifyCareTaker(true);
//     };

//     const handleVerifyDialogClose = () => {
//         setVerifyCareTaker(false);
//     };

//     const handleDeleteDialogOpen = () => {
//         setDeleteCareTaker(true);
//     };

//     const handleDeleteDialogClose = () => {
//         setDeleteCareTaker(false);
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;

//     return (
//         <div>
//             <Typography variant="h4" gutterBottom>CareTaker Details</Typography>
//             {careTaker ? (
//                 <Card>
//                     <CardContent>
//                         {careTaker.userId ? (
//                             <>
//                                 <Typography variant="body1">Username: <b>{careTaker.userId.username}</b></Typography>
//                                 <Typography variant="body1">Email: {careTaker.userId.email}</Typography>
//                                 <Typography variant="body1">Phone: {careTaker.userId.phoneNumber}</Typography>
//                             </>
//                         ) : (
//                             <Typography variant="body1">User Information not available</Typography>
//                         )}
//                         <Typography variant="body1">Business Name: {careTaker.businessName}</Typography>
//                         <Typography variant="body1">Address: {careTaker.address}</Typography>
//                         <Typography variant="body1">Bio: {careTaker.bio}</Typography>
//                         <div>
//                             <Typography variant="h6">Services:</Typography>
//                             {careTaker.serviceCharges && careTaker.serviceCharges.length > 0 ? (
//                                 careTaker.serviceCharges.map((charge, index) => (
//                                     <div key={index}>
//                                         <Typography variant="body2">Service Name: {charge.specialityName}</Typography>
//                                         <Typography variant="body2">Service Amount: {charge.amount}</Typography>
//                                         <Typography variant="body2">Service Time: {charge.time}</Typography>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <Typography variant="body2">No services available</Typography>
//                             )}
//                         </div>
//                         <div>
//                             <Typography variant="h6">Profile Photo</Typography>
//                             <CardMedia
//                                 component="img"
//                                 alt="Profile"
//                                 height="200"
//                                 image={careTaker.photo}
//                                 style={{ maxWidth: '200px' }}
//                             />
//                         </div>
//                         <div>
//                             <Typography variant="h6">Proof Document</Typography>
//                             <CardMedia
//                                 component="img"
//                                 alt="Proof Document"
//                                 height="200"
//                                 image={careTaker.proofDocument}
//                                 style={{ maxWidth: '200px' }}
//                             />
//                         </div>
//                         <div>
//                             <Typography variant="h6">Rating Details:</Typography>
//                             {ratings ? (
//                                 <>
//                                     <Typography variant="body1">Total Rating: {ratings.totalRating}</Typography>
//                                     <Typography variant="body1">Average Rating: {ratings.averageRating}</Typography>
//                                     <Typography variant="body1">Number of Reviews: {ratings.numberOfReviews}</Typography>
//                                 </>
//                             ) : (
//                                 <Typography variant="body1">No rating information available</Typography>
//                             )}
//                         </div>
//                         <Button onClick={handleVerifyDialogOpen} variant="contained" color="primary">Verify CareTaker</Button>
//                         <Button onClick={handleDeleteDialogOpen} variant="contained" color="secondary">Delete CareTaker</Button>
//                     </CardContent>
//                 </Card>
//             ) : (
//                 <div>No CareTaker details available</div>
//             )}
//             <ToastContainer />

//             {/* Verify Dialog */}
//             <Dialog open={verifyCareTaker} onClose={handleVerifyDialogClose}>
//                 <DialogTitle>Verify CareTaker</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         Are you sure you want to verify this CareTaker? This action cannot be undone.
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleVerifyDialogClose} color="primary">Cancel</Button>
//                     <Button onClick={handleVerify} color="primary">Verify</Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Delete Dialog */}
//             <Dialog open={deleteCareTaker} onClose={handleDeleteDialogClose}>
//                 <DialogTitle>Delete CareTaker</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         Are you sure you want to delete this CareTaker? This action cannot be undone.
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleDeleteDialogClose} color="primary">Cancel</Button>
//                     <Button onClick={handleDelete} color="secondary">Delete</Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Warning Dialog */}
//             <Dialog open={showWarning} onClose={() => setShowWarning(false)}>
//                 <DialogTitle>Warning</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         The average rating for this CareTaker is below 1.5. Please address the issues to improve the rating.
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setShowWarning(false)} color="primary">Close</Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// };

// export default CTVerifyedSingle;
