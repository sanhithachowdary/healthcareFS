import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './admin.css';
import AdminHome from './AdminHome';
import { useAuth } from '../contextapi/AuthContext';
import AddDoctor from './AddDoctor';
import ViewPatients from './ViewPatients';
import ViewDoctors from './ViewDoctors';
import Login from '../main/Login';
import DeleteDoctor from '../doctor/DeleteDoctor';
import DeletePatient from '../patient/DeletePatient';

export default function AdminNavBar() {
  const { setIsAdminLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => 
  {
    localStorage.removeItem('token');
    setIsAdminLoggedIn(false);
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome Admin</div>
        <ul className="nav-links">
          <li><Link to="/adminhome">Home</Link></li>
          <li><Link to="/adddoctor">Add Doctors</Link></li>
          <li><Link to="/viewallpatients">View All Patients</Link></li>

          <li className="dropdown">
            <span>Doctors</span>
            <ul className="dropdown-menu">
              <li><Link to="/adddoctor">Add</Link></li>
              <li><Link to="/viewdoctors">View All</Link></li>
              <li><Link to="/deletedoctor">Delete Doctor</Link></li>
            </ul>
          </li>

          <li className="dropdown">
            <span>Patients</span>
            <ul className="dropdown-menu">
              <li><Link to="/viewallpatinets">View All Patients</Link></li>
              <li><Link to="/deletepatient">Delete Patient</Link></li>
            </ul>
          </li>

          <li>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '16px' }}>
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/adminhome" element={<AdminHome />} exact />
        <Route path="/adddoctor" element={<AddDoctor />} exact />
        <Route path="/viewdoctors" element={<ViewDoctors />} exact />
        <Route path='/deletedoctor' element={<DeleteDoctor/>} exact/>
        <Route path="/viewallpatients" element={<ViewPatients />} exact />
        <Route path="/deletepatient" element={<DeletePatient/>} exact/>
        <Route path="/login" element={<Login />} exact />
      </Routes>
    </div>
  );
}