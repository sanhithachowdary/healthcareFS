import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Home from './Home';
import About from './About';
import './style.css';
import Contact from './Contact';
import Login from './Login';
import PatientRegistration from '../patient/PatientRegistration';
import Success from './Success';
import Cancel from './Cancel';

export default function MainNavBar() {
  const location = useLocation();
  const [dropdownActive, setDropdownActive] = useState(false);

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  const closeDropdown = () => {
    setDropdownActive(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div onClick={closeDropdown}>
      <nav className="navbar">
        <div className="logo">Health Care Appointment System</div>
        <ul className="nav-links">
          <li>
            <Link to="/" className={isActive("/") ? 'active' : ''}>Home</Link>
          </li>
          
          <li>
            <Link to="/patientregistration" className={isActive("/patientregistration") ? 'active' : ''}>Register</Link>
          </li>
          <li>
            <Link to="/login" className={isActive("/login") ? 'active' : ''}>Login</Link>
          </li>
          <li>
            <Link to="/about" className={isActive("/about") ? 'active' : ''}>About</Link>
          </li>
          <li>
            <Link to="/contact" className={isActive("/contact") ? 'active' : ''}>Contact</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/patientregistration" element={<PatientRegistration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/success" element={<Success/>}/>
        <Route path="/cancel" element={<Cancel/>} />
      </Routes>
    </div>
  );
}
