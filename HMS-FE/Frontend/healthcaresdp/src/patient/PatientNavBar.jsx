import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './patient.css';
import { useAuth } from '../contextapi/AuthContext';
import PatientHome from './PatientHome';
import TakeAppointment from './TakeAppointment';
import ViewAppointmentStatus from './ViewAppointmentStatus';
import ViewPrescription from './ViewPrescription';
import PatientProfile from './PatientProfile';
import Login from '../main/Login';
import UpdateAccountDetails from './UpdateAccountDetails';

export default function PatientNavBar() {
  const { setIsPatientLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsPatientLoggedIn(false);
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome Patient</div>
        <ul className="nav-links">
          <li><Link to="/patienthome">Home</Link></li>
          <li><Link to="/takeappointment">Take Appointment</Link></li>
          <li><Link to="/viewappointmentstatus">View Appointment Status</Link></li>
          <li><Link to="/viewprescription">View Prescription</Link></li>
          <li><Link to="/patientprofile">Profile</Link></li>
          <li><Link to="/updateaccount">Update Account Details</Link></li>
          <li>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '16px' }}>
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/patienthome" element={<PatientHome />} exact />
        <Route path="/takeappointment" element={<TakeAppointment />} exact />
        <Route path="/viewappointmentstatus" element={<ViewAppointmentStatus />} exact />
        <Route path="/viewprescription" element={<ViewPrescription />} exact />
        <Route path="/patientprofile" element={<PatientProfile />} exact />
        <Route path="/updateaccount" element={<UpdateAccountDetails />} exact />
        <Route path="/login" element={<Login />} exact />
      </Routes>
    </div>
  );
}
