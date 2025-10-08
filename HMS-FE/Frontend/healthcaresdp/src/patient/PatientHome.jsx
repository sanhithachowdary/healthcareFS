import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PatientHome() {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate('/book-appointment');
  };

  const handleViewDoctors = () => {
    navigate('/doctors');
  };

  const handleMyAppointments = () => {
    navigate('/my-appointments');
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1580281658629-13e6a9c42713?auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: '#fff',
        textAlign: 'center',
        padding: '60px 20px',
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      <h1 style={{ fontSize: '38px', fontWeight: '700', marginBottom: '20px', textShadow: '2px 2px 8px rgba(0,0,0,0.4)' }}>
        Welcome to Your Patient Dashboard
      </h1>

      <p style={{ fontSize: '18px', marginBottom: '40px', maxWidth: '600px', margin: '0 auto', textShadow: '1px 1px 6px rgba(0,0,0,0.3)' }}>
        Manage your health easily — book appointments, connect with doctors, and track your upcoming visits all in one place.
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '25px',
          flexWrap: 'wrap',
          marginTop: '50px'
        }}
      >
        <div
          onClick={handleBookAppointment}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#007bff',
            borderRadius: '15px',
            width: '250px',
            padding: '30px',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease-in-out'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <h3 style={{ marginBottom: '15px' }}>🩺 Book Appointment</h3>
          <p>Schedule an appointment with our expert doctors easily.</p>
        </div>

        <div
          onClick={handleViewDoctors}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#28a745',
            borderRadius: '15px',
            width: '250px',
            padding: '30px',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease-in-out'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <h3 style={{ marginBottom: '15px' }}>👨‍⚕️ View Doctors</h3>
          <p>Find the right specialist and check their availability.</p>
        </div>

        <div
          onClick={handleMyAppointments}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#ff5722',
            borderRadius: '15px',
            width: '250px',
            padding: '30px',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease-in-out'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <h3 style={{ marginBottom: '15px' }}>📅 My Appointments</h3>
          <p>View or cancel your upcoming and past appointments.</p>
        </div>
      </div>
    </div>
  );
}
