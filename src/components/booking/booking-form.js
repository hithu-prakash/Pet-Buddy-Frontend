import React, { useState } from 'react';
import axios from 'axios';

export default function BookingForm() {
  const [formValues, setFormValues] = useState({
    parentId: '',
    category: '',
    date: {
      startTime: '',
      endTime: ''
    },
    totalAmount: '',
    accepted: false,
    serviceName: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'startTime' || name === 'endTime') {
      setFormValues((prevValues) => ({
        ...prevValues,
        date: {
          ...prevValues.date,
          [name]: value
        }
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!formValues.category) validationErrors.category = 'Category is required';
    if (!formValues.date.startTime) validationErrors.startTime = 'Start time is required';
    if (!formValues.date.endTime) validationErrors.endTime = 'End time is required';
    if (!formValues.serviceName) validationErrors.serviceName = 'Service name is required';
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
      const response = await axios.post('/api/bookings', formValues);
      console.log('Booking successful:', response.data);
      setFormValues({
        parentId: '',
        category: '',
        date: {
          startTime: '',
          endTime: ''
        },
        totalAmount: '',
        accepted: false,
        serviceName: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Error submitting booking:', error);
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
          <label htmlFor="serviceName">Select Service Name</label><br />
          <select
            name="serviceName"
            value={formValues.serviceName}
            onChange={handleChange}
          >
            <option value="">Select Service</option>
            <option value="Pet-Boarding">Pet-Boarding</option>
            <option value="Pet-Sitting">Pet-Sitting</option>
            <option value="Pet-Walking">Pet-Walking</option>
            <option value="Pet-Grooming">Pet-Grooming</option>
            <option value="Pet-Taxi">Pet-Taxi</option>
            <option value="Pet-Training">Pet-Training</option>
            <option value="Vet-Consult">Vet-Consult</option>
            <option value="Others">Others...</option>
          </select>
          {errors.serviceName && <div>{errors.serviceName}</div>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
