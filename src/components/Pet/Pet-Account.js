import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';

export default function PetAccount() {
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPet = async () => {
          try {
            const response = await axios.get('/pet/singlePet', {
              headers: {
                Authorization: localStorage.getItem('token'),
              },
            });
            console.log(response.data);
            setPet(response.data);
            setLoading(false);
          } catch (err) {
            console.error(err);
            setError(err.message);
            setLoading(false);
          }
        };
        fetchPet(); // Calling the function here
      }, []);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Pet Details</h2>
            {pet ? (
                <div>
                    <h3>Pet Name: {pet.petName}</h3>
                    <p>Age: {pet.age}</p>
                    <p>Gender: {pet.gender}</p>
                    <p>Categories: {pet.categories}</p>
                    <p>Breed: {pet.breed}</p>
                    <div>
                        <h3>Pet Photo</h3>
                        <img src={pet.petPhoto} alt='Pet Photo' style={{ maxWidth: '200px' }} />
                    </div>
                    <p>Weight: {pet.weight}</p>
                    {pet.medication && (
                        <div>
                            <h3>Medications:</h3>
                            <ul>
                                <li>
                                    <p>Medication Name: {pet.medication.medicationName}</p>
                                    <p>Description: {pet.medication.description}</p>
                                    <p>Due Date: {pet.medication.dueDate}</p>
                                    <p>Dose: {pet.medication.dose}</p>
                                </li>
                            </ul>
                        </div>
                    )}
                    {pet.reminders && (
                        <div>
                            <h3>Reminders:</h3>
                            <ul>
                                <li>
                                    <p>Date: {pet.reminders.date}</p>
                                    <p>Title: {pet.reminders.title}</p>
                                    <p>Note: {pet.reminders.note}</p>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <div>Pet not found</div>
            )}
        </div>
    );
}