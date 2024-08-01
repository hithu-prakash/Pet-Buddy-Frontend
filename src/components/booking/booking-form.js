import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function BookingForm() {
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    category: '',
    date: { startTime: '', endTime: '' },
    totalAmount: '',
    accepted: false,
    specialityName: '',
  });
  const [errors, setErrors] = useState({});
  const [careTaker, setCareTaker] = useState({});
  const [serviceCharges, setServiceCharges] = useState([]);

  useEffect(() => {
    const fetchCareTaker = async () => {
      try {
        const response = await axios.get(`/api/careTaker/${id}`);
        setCareTaker(response.data);
        setServiceCharges(response.data.serviceCharges);
        // Set initial form values from the first service charge
        if (response.data.serviceCharges.length > 0) {
          const firstServiceCharge = response.data.serviceCharges[0];
          setFormValues(prevValues => ({
            ...prevValues,
            specialityName: firstServiceCharge.specialityName,
            totalAmount: firstServiceCharge.amount,
          }));
        }
      } catch (error) {
        console.error('Error fetching care taker:', error.response || error.message);
      }
    };

    fetchCareTaker();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'startTime' || name === 'endTime') {
      setFormValues(prevValues => ({
        ...prevValues,
        date: { ...prevValues.date, [name]: value },
      }));
    } else {
      setFormValues(prevValues => ({
        ...prevValues,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSpecialityChange = (e) => {
    const { value } = e.target;
    const selectedService = serviceCharges.find(service => service.specialityName === value);
    setFormValues(prevValues => ({
      ...prevValues,
      specialityName: value,
      totalAmount: selectedService ? selectedService.amount : ''
    }));
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!formValues.category) validationErrors.category = 'Category is required';
    if (!formValues.date.startTime) validationErrors.startTime = 'Start time is required';
    if (!formValues.date.endTime) validationErrors.endTime = 'End time is required';
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await axios.post(`/api/booking/create/careTaker/${caretakerId}`, formValues);
      console.log('Booking successful:', response.data);
      setFormValues({
        category: '',
        date: { startTime: '', endTime: '' },
        totalAmount: '',
        accepted: false,
        specialityName: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error submitting booking:', error.response || error.message);
    }
  };

  return (
    <div>
      <h1>Booking Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Category</label>
          <div>
            <label>
              <input
                type="radio"
                id="dog"
                name="category"
                value="dog"
                checked={formValues.category === 'dog'}
                onChange={handleChange}
              />
              Dog
            </label>
            <label>
              <input
                type="radio"
                id="cat"
                name="category"
                value="cat"
                checked={formValues.category === 'cat'}
                onChange={handleChange}
              />
              Cat
            </label>
          </div>
          {errors.category && <div>{errors.category}</div>}
        </div>
        <div>
          <label htmlFor="startTime">Start Time</label>
          <input
            id="startTime"
            name="startTime"
            type="datetime-local"
            value={formValues.date.startTime}
            onChange={handleChange}
          />
          {errors.startTime && <div>{errors.startTime}</div>}
        </div>
        <div>
          <label htmlFor="endTime">End Time</label>
          <input
            id="endTime"
            name="endTime"
            type="datetime-local"
            value={formValues.date.endTime}
            onChange={handleChange}
          />
          {errors.endTime && <div>{errors.endTime}</div>}
        </div>
        <div>
          <label htmlFor="specialityName">Speciality Name</label>
          <select
            id="specialityName"
            name="specialityName"
            value={formValues.specialityName}
            onChange={handleSpecialityChange}
          >
            <option value="">Select a service</option>
            {serviceCharges.map((service, index) => (
              <option key={index} value={service.specialityName}>
                {service.specialityName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Total Amount: {formValues.totalAmount}</p>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
