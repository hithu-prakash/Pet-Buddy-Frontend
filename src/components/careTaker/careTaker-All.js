import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { Link ,useParams} from 'react-router-dom';

export default function CareTakerAll() {
    //const {id}=useParams()
  const [careTakers, setCareTakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchCareTakers = async () => {
      try {
        const response = await axios.get('/caretaker/showallverifiedcareTaker', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        console.log(response.data);
        setCareTakers(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setErrors(error);
        setLoading(false);
      }
    };
    fetchCareTakers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (errors) return <div>{errors.message}</div>;

  return (
    <div>
      <h2>Verified Caretakers List</h2>
      {careTakers.map((ele) => (
        <div key={ele._id} className="care-taker-card">
          {ele.userId ? (
            <>
              <h2>{ele.userId.username}</h2>
              <p>Email: {ele.userId.email}</p>
              <p>Phone: {ele.userId.phoneNumber}</p>
            </>
          ) : (
            <p>User Information not available</p>
          )}
          <p>Business Name: {ele.businessName}</p>
          <p>Address: {ele.address}</p>
          <p>Bio: {ele.bio}</p>
          <div>
            <h3>Services:</h3>
            {ele.serviceCharges.map((charge, index) => (
              <div key={index}>
                <p>Service Name: {charge.name}</p>
                <p>Service Amount: {charge.amount}</p>
                <p>Service Time: {charge.time}</p>
              </div>
            ))}
          </div>
          <div>
            <h3>Profile Photo</h3>
            <img src={ele.photo} alt="Profile" style={{ maxWidth: '200px' }} />
          </div>
          <div>
            <h3>Proof Document</h3>
            <img src={ele.proof} alt="Proof" style={{ maxWidth: '200px' }} />
          </div>
          {ele.userId && ele.userId._id && (
            <Link to={`/caretaker-account/${ele._id}`}>View Details</Link>
          )}
        </div>
      ))}
    </div>
  );
}
