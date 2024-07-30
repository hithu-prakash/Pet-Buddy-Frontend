// import React, { useEffect, useState } from 'react';
// import axios from '../../config/axios';

// export default function PetParentAccount() {
//     const [petParent, setPetParent] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPetParent = async () => {
//             try {
//                 const response = await axios.get('/petParent/oneParent', {
//                     headers: {
//                         Authorization: localStorage.getItem('token'),
//                       },
//                 });
//                 setPetParent(response.data);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err.response?.data?.error || err.message);
//                 setLoading(false);
//             }
//         };
//         fetchPetParent();
//     }, []);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div>
//             <h2>Pet Parent Details</h2>
//             {petParent ? (
//                 <div>
//                     <h3>Username: {petParent.userId.username}</h3>
//                     <p>Email: {petParent.userId.email}</p>
//                     <p>Phone: {petParent.userId.phoneNumber}</p>
//                     <p>Address: {petParent.address}</p>
//                     <div>
//                         <h3>Profile Photo</h3>
//                         <img src={petParent.parentPhoto} alt='Profile' style={{ maxWidth: '200px' }} />
//                     </div>
//                     <div>
//                         <h3>Proof Photo</h3>
//                         <img src={petParent.proof} alt='Proof' style={{ maxWidth: '200px' }} />
//                     </div>
//                 </div>
//             ) : (
//                 <div>Pet Parent not found</div>
//             )}
//         </div>
//     );
// }

import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';

export default function PetParentAccount() {
    const [petParent, setPetParent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        address: '',
        parentPhoto: '',
        proof: '',
        // Add other fields as needed
    });
    const [fileData, setFileData] = useState({
        parentPhoto: null,
        proof: null,
    });

    useEffect(() => {
        const fetchPetParent = async () => {
            try {
                const response = await axios.get('/petParent/oneParent', {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
                console.log('Fetched pet parent:', response.data); // Debug log
                setPetParent(response.data);
                setFormData({
                    address: response.data.address,
                    parentPhoto: response.data.parentPhoto,
                    proof: response.data.proof,
                    // Initialize other fields as needed
                });
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.error || err.message);
                setLoading(false);
            }
        };
        fetchPetParent();
    }, []);
    
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFileData({ ...fileData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleUpdate = async () => {
        
        try {
            const data = new FormData();
            data.append('address', formData.address);
            if (fileData.parentPhoto) data.append('parentPhoto', fileData.parentPhoto);
            if (fileData.proof) data.append('proof', fileData.proof);
          

           const edit= await axios.put(`/petParent/update/${petParent._id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: localStorage.getItem('token'),
                },

            });

            console.log(edit)
            // Fetch updated pet parent data
            const response = await axios.get('/petParent/oneParent', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });
            setPetParent(response.data);
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.error || err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Pet Parent Details</h2>
            {petParent ? (
                <div>
                    {isEditing ? (
                        <div>
                            <h3>Update Pet Parent Details</h3>
                            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                                <label>
                                    Address:
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </label><br/>
                                <label>
                                    Profile Photo:
                                    <input
                                        type="file"
                                        name="parentPhoto"
                                        onChange={handleChange}
                                    />
                                </label><br/>
                                <label>
                                    Proof Photo:
                                    <input
                                        type="file"
                                        name="proof"
                                        onChange={handleChange}
                                    />
                                </label><br/>
                                {/* Add more fields as needed */}
                                <button type="submit">Update</button>
                                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <h3>Username: {petParent.userId.username}</h3>
                            <p>Email: {petParent.userId.email}</p>
                            <p>Phone: {petParent.userId.phoneNumber}</p>
                            <p>Address: {petParent.address}</p>
                            <div>
                                <h3>Profile Photo</h3>
                                <img src={petParent.parentPhoto} alt='Profile' style={{ maxWidth: '200px' }} />
                            </div>
                            <div>
                                <h3>Proof Photo</h3>
                                <img src={petParent.proof} alt='Proof' style={{ maxWidth: '200px' }} />
                            </div>
                            <button onClick={handleEditClick}>Edit Details</button>
                        </div>
                    )}
                </div>
            ) : (
                <div>Pet Parent not found</div>
            )}
        </div>
    );
}
