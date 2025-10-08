import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contextapi/AuthContext'; // 🛑 You missed importing this!

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { setIsAdminLoggedIn, setIsDoctorLoggedIn, setIsPatientLoggedIn } = useAuth(); // 🛑 You need to use this!

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!identifier || !password) {
      setError('Please fill in both Username and Password.');
      return;
    }

    try {
      const response = await axios.post(`${config.url}/auth/api/checklogin`, {
        identifier: identifier,
        password: password,
      });

      console.log('Login Response:', response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);

        const role = response.data.role;

        // ✅ Clear previous states
        setIsAdminLoggedIn(false);
        setIsDoctorLoggedIn(false);
        setIsPatientLoggedIn(false);

        if (role === 'admin') {
          setIsAdminLoggedIn(true); // ✅ Updating AuthContext
          navigate('/adminhome');
        } else if (role === 'doctor') {
          setIsDoctorLoggedIn(true); // ✅ Updating AuthContext
          navigate('/doctorhome');
        } else if (role === 'patient') {
          setIsPatientLoggedIn(true); // ✅ Updating AuthContext
          navigate('/patienthome');
        } else {
          setError('Unauthorized role.');
        }
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      console.log('Error:', err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'An error occurred during login.');
      } else {
        setError('An error occurred while trying to log in.');
      }
    }
  };

  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            style={{ padding: '10px', width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', width: '100%' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
    </div>
  );
}
