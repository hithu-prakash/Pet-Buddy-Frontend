import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate(); // Import and initialize useNavigate
  const [specialityName, setSpecialityName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [services, setServices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookingDurationInHours, setBookingDurationInHours] = useState(0);
  const [businessName, setBusinessName] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCaretakerDetails = async () => {
      try {
        const response = await axios.get(`/careTaker/singlecareTaker/${id}`);
        setServices(response.data.serviceCharges || []);
        setBusinessName(response.data.businessName || '');
      } catch (error) {
        console.error('Error fetching caretaker details:', error.message);
      }
    };

    fetchCaretakerDetails();
  }, [id]);

  const calculateTotalAmount = () => {
    if (!startTime || !endTime || !specialityName) return;

    try {
      const start = new Date(startTime);
      const end = new Date(endTime);

      const durationInMinutes = (end - start) / (1000 * 60); // duration in minutes
      const durationInHours = durationInMinutes / 60; // convert minutes to hours

      if (durationInMinutes <= 0) {
        throw new Error('Start time cannot be equal to or later than end time.');
      }

      const serviceCharge = services.find(charge => charge.specialityName === specialityName);
      if (serviceCharge) {
        const hourlyRate = serviceCharge.amount / serviceCharge.time;
        setTotalAmount(hourlyRate * durationInHours);
        setBookingDurationInHours(parseFloat(durationInHours.toFixed(2))); // limit to two decimal places
      }
    } catch (error) {
      console.error('Error calculating total amount:', error.message);
      setTotalAmount(0);
      setBookingDurationInHours(0);
    }
  };

  useEffect(() => {
    if (startTime && endTime) {
      calculateTotalAmount();
    }
  }, [startTime, endTime, specialityName]);

  const runValidation = () => {
    const validationErrors = {};

    if (!specialityName) validationErrors.specialityName = 'Please select a service.';
    if (!startTime) validationErrors.startTime = 'Please select a start time.';
    if (!endTime) validationErrors.endTime = 'Please select an end time.';
    if (startTime && endTime && new Date(endTime) <= new Date(startTime)) {
      validationErrors.timeRange = 'End time must be after start time.';
    }
    if (isNaN(totalAmount) || totalAmount <= 0) validationErrors.totalAmount = 'Total amount is invalid.';
    if (isNaN(bookingDurationInHours) || bookingDurationInHours <= 0) validationErrors.bookingDurationInHours = 'Booking duration is invalid.';

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleServiceNameChange = (e) => {
    setSpecialityName(e.target.value);
    runValidation();
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    runValidation();
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
    runValidation();
    calculateTotalAmount();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!runValidation()) return;

    const bookingData = {
      specialityName,
      date: {
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
      },
      totalAmount,
      bookingDurationInHours,
    };

    try {
      const response = await axios.post(`/booking/careTaker/${id}`, bookingData, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      console.log('Booking created:', response.data);
      toast.success("Booking created successfully.");
      alert("Please wait until the Care-Taker accepts your booking");

      // Call handleBookingSuccess with the booking ID from response
      handleBookingSuccess(response.data._id);
    } catch (error) {
      console.error('Error creating booking:', error.message);
    }
  };

  const handleBookingSuccess = (id) => {
    navigate(`/create-review/${id}`); // Navigate to the review creation page
  };

  return (
    <>
      <h2>Booking Care-Taker</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Service Name:</label>
          <select value={specialityName} onChange={handleServiceNameChange}>
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.specialityName} value={service.specialityName}>
                {service.specialityName}
              </option>
            ))}
          </select>
          {errors.specialityName && <p className="error">{errors.specialityName}</p>}
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={handleStartTimeChange}
          />
          {errors.startTime && <p className="error">{errors.startTime}</p>}
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={handleEndTimeChange}
          />
          {errors.endTime && <p className="error">{errors.endTime}</p>}
          {errors.timeRange && <p className="error">{errors.timeRange}</p>}
        </div>
        <div>
          <p>Total Amount: ₹ {totalAmount.toFixed(2)}</p>
          <p>Booking Duration: {bookingDurationInHours.toFixed(2)} hours</p>
          <p>CareTaker: {businessName}</p>
        </div>
        <button type="submit">Book Now</button>
      </form>
      <ToastContainer />
    </>
  );
}
