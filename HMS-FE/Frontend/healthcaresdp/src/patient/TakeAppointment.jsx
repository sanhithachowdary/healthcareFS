import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const stripePromise = loadStripe('pk_test_51RJL4HPwY0QLoqZ0iyPU3Egoasroztj4wk8XPaElAffDQtE7fbR23yR7Lhl42Bny6HAfFW48OL6ia3hRmUN70m7900m3r31kH1');

export default function TakeAppointment() {
  const [appointment, setAppointment] = useState({
    doctorId: '',
    doctorName: '', // Added field
    appointmentDate: '',
    appointmentTime: '',
    appointmentReason: '',
    paymentAmount: 200,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Please login as a patient to book an appointment');
      return;
    }

    toast('Redirecting to Stripe checkout...', { position: 'top-right' });

    const stripe = await stripePromise;

    try {
      const response = await axios.post(
        'http://localhost:2027/appointment/createsession',
        {
          doctorId: appointment.doctorId,
          doctorName: appointment.doctorName, // Send doctor name
          appointmentDate: appointment.appointmentDate,
          appointmentTime: appointment.appointmentTime,
          appointmentReason: appointment.appointmentReason,
          paymentAmount: appointment.paymentAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (result.error) {
        console.error(result.error.message);
        toast.error('Stripe checkout failed!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to initiate payment. Try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <ToastContainer />
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label>Doctor ID:</label><br />
        <input
          type="text"
          name="doctorId"
          value={appointment.doctorId}
          onChange={handleChange}
          required
        /><br /><br />

        <label>Doctor Name:</label><br />
        <input
          type="text"
          name="doctorName"
          value={appointment.doctorName}
          onChange={handleChange}
          required
        /><br /><br />

        <label>Appointment Date:</label><br />
        <input
          type="date"
          name="appointmentDate"
          value={appointment.appointmentDate}
          onChange={handleChange}
          required
        /><br /><br />

        <label>Appointment Time:</label><br />
        <input
          type="time"
          name="appointmentTime"
          value={appointment.appointmentTime}
          onChange={handleChange}
          required
        /><br /><br />

        <label>Reason for Appointment:</label><br />
        <textarea
          name="appointmentReason"
          value={appointment.appointmentReason}
          onChange={handleChange}
          rows="3"
        /><br /><br />

        <label>Payment Amount: ₹</label>
        <strong>{appointment.paymentAmount}</strong><br /><br />

        <button type="submit">Proceed to Pay</button>
      </form>
    </div>
  );
}
