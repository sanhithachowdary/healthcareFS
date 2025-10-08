import { useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function PatientRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    gender: '',
    age: '',
    phone: '',
    address: '',
    email: '',
    role: 'PATIENT'
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.url}/patient/add`, formData);
      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        setFormData({
          name: '',
          username: '',
          gender: '',
          age: '',
          phone: '',
          address: '',
          email: '',
          role: 'PATIENT'
        });
      }
    } catch (error) {
      setMessage('');
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Patient Registration</h3>
      {message ? 
        <p style={{ textAlign: "center", color: "green", fontWeight: "bolder" }}>{message}</p> :
        <p style={{ textAlign: "center", color: "red", fontWeight: "bolder" }}>{error}</p>
      }
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Username</label>
          <input type="text" id="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender</label>
          <select id="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Age</label>
          <input type="number" id="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone</label>
          <input type="text" id="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div>
          <label>Address</label>
          <input type="text" id="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Role</label>
          <input type="text" id="role" value={formData.role} readOnly />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
