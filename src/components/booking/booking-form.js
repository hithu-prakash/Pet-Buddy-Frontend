import React, { useState } from 'react';
import axios from 'axios';

export default function BookingForm  (){
  
  const [formValues, setFormValues] = useState({
    // userId: '',
    // caretakerId: '',
    // petId: '',
    parentId: '',
    category: '',
    date: '',
    totalAmount: '',
    accepted: false
  });

 
  const [errors, setErrors] = useState({});

 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

      if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('/api/bookings', formValues);
      console.log('Booking successful:', response.data);
     
      setFormValues({
        userId: '',
        caretakerId: '',
        petId: '',
        parentId: '',
        category: '',
        date:'',
        totalAmount: '',
        accepted: false
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
          <label htmlFor="userId">User ID</label>
          <input
            id="userId"
            name="userId"
            type="text"
            value={formValues.userId}
            onChange={handleChange}
          />
          {errors.userId && <div>{errors.userId}</div>}
        </div>

        <div>
          <label htmlFor="caretakerId">CareTaker ID</label>
          <input
            id="caretakerId"
            name="caretakerId"
            type="text"
            value={formValues.caretakerId}
            onChange={handleChange}
          />
          {errors.caretakerId && <div>{errors.caretakerId}</div>}
        </div>

        <div>
          <label htmlFor="petId">Pet ID</label>
          <input
            id="petId"
            name="petId"
            type="text"
            value={formValues.petId}
            onChange={handleChange}
          />
          {errors.petId && <div>{errors.petId}</div>}
        </div>

        <div>
          <label htmlFor="parentId">Parent ID</label>
          <input
            id="parentId"
            name="parentId"
            type="text"
            value={formValues.parentId}
            onChange={handleChange}
          />
          {errors.parentId && <div>{errors.parentId}</div>}
        </div>

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
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="datetime-local"
            value={formValues.date}
            onChange={handleChange}
          />
          {errors.date && <div>{errors.date}</div>}
        </div>

        
        
        <div>
          <label htmlFor="totalAmount">Total Amount</label>
          <input
            id="totalAmount"
            name="totalAmount"
            type="number"
          
            value={formValues.totalAmount}
            onChange={handleChange}
          />
          {errors.totalAmount && <div>{errors.totalAmount}</div>}
        </div>

        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


