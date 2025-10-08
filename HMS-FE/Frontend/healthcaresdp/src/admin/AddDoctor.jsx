import { useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function AddDoctor() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    email: '',
    username: '',
    specialization: '',
    qualification: '',
    experience: '',
    phone: '',
    address: '',
    bio: '',
    role: 'DOCTOR'
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleCase = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.toUpperCase() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${config.url}/admin/adddoctor`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        setFormData({
          name: '',
          gender: '',
          dob: '',
          email: '',
          username: '',
          specialization: '',
          qualification: '',
          experience: '',
          phone: '',
          address: '',
          bio: '',
          role: 'DOCTOR'
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
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Add Doctor</h3>
      {message ? (
        <p style={{ textAlign: "center", color: "green", fontWeight: "bolder" }}>{message}</p>
      ) : (
        <p style={{ textAlign: "center", color: "red", fontWeight: "bolder" }}>{error}</p>
      )}
      <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
        <div>
          <label>Full Name</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} onKeyUp={handleCase} required />
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
          <label>Date of Birth</label>
          <input type="date" id="dob" value={formData.dob} onChange={handleChange} required />
        </div>

        <div>
          <label>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div>
          <label>Username</label>
          <input type="text" id="username" value={formData.username} onChange={handleChange} required />
        </div>

        <div>
          <label>Specialization</label>
          <input type="text" id="specialization" value={formData.specialization} onChange={handleChange} required />
        </div>

        <div>
          <label>Qualification</label>
          <input type="text" id="qualification" value={formData.qualification} onChange={handleChange} required />
        </div>

        <div>
          <label>Experience (in years)</label>
          <input type="number" id="experience" value={formData.experience} onChange={handleChange} required />
        </div>

        <div>
          <label>Phone Number</label>
          <input type="text" id="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div>
          <label>Address</label>
          <textarea id="address" value={formData.address} onChange={handleChange} required />
        </div>

        <div>
          <label>Bio</label>
          <textarea id="bio" value={formData.bio} onChange={handleChange} rows="4" maxLength="1000" />
        </div>

        <div>
          <label>Role</label>
          <input
            type="text"
            id="role"
            value={formData.role}
            onChange={handleChange}
            readOnly
            required
            style={{ backgroundColor: "#e9ecef", cursor: "not-allowed" }}
          />
        </div>

        <button type="submit" style={{ marginTop: "20px" }}>Add</button>
      </form>
    </div>
  );
}
