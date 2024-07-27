import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { useParams } from 'react-router-dom'; // Import useParams

export default function PetParentAccount() {
  const { id } = useParams(); // Use useParams to get URL parameters
  const [petParents, setPetParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPetParents = async () => {
      console.log("Fetching data for ID:", id);
      try {
        const response = await axios.get(`/petParent/oneParent/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          }
        });
        console.log("Response received:", response.data);
        setPetParents(response.data);
        setLoading(false);
      } catch (errors) {
        console.error("Error:", errors);
        setError(errors);
        setLoading(false);
      }
    };

    fetchPetParents();
  }, [id]); // Add `id` as a dependency to the effect


  return (
    <div>
      <h1>Pet Parent Account</h1>
      {petParents.length > 0 ? (
        petParents.map(petParent => (
          <div key={petParent._id} className="pet-parent-card">
            {petParent && petParent.userId ? (
              <>
                <h2>Username: {petParent.userId.username}</h2>
                <p>Email: {petParent.userId.email}</p>
                <p>Phone: {petParent.userId.phoneNumber}</p>
              </>
            ) : (
              <p>User information not available</p>
            )}
            <p>Address: {petParent.address || 'No address available'}</p>
            <div>
              <h3>Profile Photo:</h3>
              {petParent.photo ? (
                <img src={petParent.photo} alt="Profile" style={{ maxWidth: '200px' }} />
              ) : (
                <p>No profile photo available</p>
              )}
            </div>
            <div>
              <h3>Proof Document:</h3>
              {petParent.proof ? (
                petParent.proof.endsWith('.pdf') ? (
                  <a href={petParent.proof} target="_blank" rel="noopener noreferrer">View PDF</a>
                ) : (
                  <img src={petParent.proof} alt="Proof" style={{ maxWidth: '200px' }} />
                )
              ) : (
                <p>No proof document available</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No pet parent data available</p>
      )}
    </div>
  );
}
