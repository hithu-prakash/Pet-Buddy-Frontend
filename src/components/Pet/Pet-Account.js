import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../utility/spinner';

export default function PetAccount() {
  const { id } = useParams(); // Get pet ID from URL parameters
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`/pet/singlePet/${id}`, {
          headers: {
            Authorization: ` ${localStorage.getItem('token')}`,
          },
        });
        setPet(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err); // Log full error for debugging
        setError('Something went wrong. Please try again.');
        setLoading(false);
      }
    };
    if (id) {
      fetchPet();
    }
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      try {
        await axios.delete(`/pet/delete/${pet._id}`, {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
          },
        });
        toast.success("Pet deleted successfully.");
        navigate('/pets');
      } catch (err) {
        toast.error("Failed to delete pet. Please try again.");
        console.error(err); // Log full error for debugging
      }
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Pet Details</h2>
      {pet ? (
        <div className='pet-card'>
          <h3>Pet Name: {pet.petName}</h3>
          <p>Age: {pet.age}</p>
          <p>Gender: {pet.gender}</p>
          <p>Categories: {pet.categories}</p>
          <p>Breed: {pet.breed}</p>
          <div>
            <h3>Pet Photo</h3>
            <img src={pet.petPhoto} alt='Pet' style={{ maxWidth: '200px' }} />
          </div>
          <p>Weight: {pet.weight}</p>
          {pet.medication && (
            <div>
              <h3>Medications:</h3>
              <ul>
                {pet.medication.map((med, index) => (
                  <li key={index}>
                    <p>Medication Name: {med.medicationName}</p>
                    <p>Description: {med.description}</p>
                    <p>Due Date: {med.dueDate}</p>
                    <p>Dose: {med.dose}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {pet.reminders && pet.reminders.length > 0 && (
            <div>
              <h3>Reminders:</h3>
              <ul>
                {pet.reminders.map((reminder, index) => (
                  <li key={index}>
                    <p>Date: {reminder.date}</p>
                    <p>Title: {reminder.title}</p>
                    <p>Note: {reminder.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button onClick={() => navigate(`/update-pet/${pet._id}`)}>Update your Pet</button>
          <button onClick={handleDelete}>Delete your Pet</button>
          <button onClick={() => navigate(`/caretaker-all`)}>Book CareTaker</button>
        </div>
      ) : (
        <div>No Pet profile found.</div>
      )}
      <ToastContainer />
    </div>
  );
}
