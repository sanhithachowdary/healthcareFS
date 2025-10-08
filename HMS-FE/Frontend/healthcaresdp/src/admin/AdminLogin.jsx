import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate fields
    if (!identifier || !password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      const response = await axios.post(`${config.url}/auth/api/checklogin`, {
        identifier: identifier,
        password: password,
      });

      console.log('Login Response:', response.data); // Debugging

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/adminhome');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      console.log('Error:', err); // Debugging
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'An error occurred during login');
      } else {
        setError('An error occurred while trying to log in.');
      }
    }
  };

  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h2>Admin Login</h2>
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
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white' }}>
          Login
        </button>
      </form>

      {/* Display error message if any */}
      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
    </div>
  );
}
