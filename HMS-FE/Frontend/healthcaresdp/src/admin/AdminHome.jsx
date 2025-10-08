import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';

export default function AdminHome() {
  const [patientCount, setPatientCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/adminlogin');
      return;
    }

    const fetchCounts = async () => {
      try {
        const patientRes = await axios.get(`${config.url}/admin/patientcount`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const doctorRes = await axios.get(`${config.url}/admin/doctorcount`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const appointRes = await axios.get(`${config.url}/admin/appointmentcount`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        setPatientCount(patientRes.data);
        setDoctorCount(doctorRes.data);
        setAppointmentCount(appointRes.data);
      } catch (error) {
        console.error("Error fetching counts:", error);
        setError("Error fetching counts: " + (error.response ? error.response.data : error.message));

        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/adminlogin');
        }
      }
    };

    fetchCounts();
  }, [navigate]);

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '50px 20px',
        minHeight: '100vh',
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
          url('https://images.unsplash.com/photo-1588776814546-3b61f6b6b43a?auto=format&fit=crop&w=1600&q=80')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff',
      }}
    >
      <h2 style={{
        fontSize: '32px',
        fontWeight: '700',
        letterSpacing: '1px',
        textShadow: '0 3px 8px rgba(0,0,0,0.6)',
        marginBottom: '40px'
      }}>
        Welcome to Admin Dashboard
      </h2>

      {error && (
        <p style={{ color: '#ff4444', fontWeight: 'bold', backgroundColor: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px' }}>
          {error}
        </p>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          marginTop: '40px',
          flexWrap: 'wrap',
        }}
      >
        {/* Patients Card */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '20px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
            padding: '30px',
            width: '230px',
            backdropFilter: 'blur(12px)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 10px 35px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
          }}
        >
          <h3 style={{ marginBottom: '12px', color: '#f1f1f1', fontWeight: '600' }}>Patients</h3>
          <p style={{ fontSize: '40px', fontWeight: 'bold', color: '#00bfff' }}>{patientCount}</p>
        </div>

        {/* Doctors Card */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '20px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
            padding: '30px',
            width: '230px',
            backdropFilter: 'blur(12px)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 10px 35px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
          }}
        >
          <h3 style={{ marginBottom: '12px', color: '#f1f1f1', fontWeight: '600' }}>Doctors</h3>
          <p style={{ fontSize: '40px', fontWeight: 'bold', color: '#4effa1' }}>{doctorCount}</p>
        </div>

        {/* Appointments Card */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '20px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
            padding: '30px',
            width: '230px',
            backdropFilter: 'blur(12px)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 10px 35px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
          }}
        >
          <h3 style={{ marginBottom: '12px', color: '#f1f1f1', fontWeight: '600' }}>Appointments</h3>
          <p style={{ fontSize: '40px', fontWeight: 'bold', color: '#ff8c42' }}>{appointmentCount}</p>
        </div>
      </div>
    </div>
  );
}
