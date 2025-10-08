import './style.css';

export default function Home() {
  return (
    <div className="home-container">
      
      <div className="admin-section">
        <h3>Admin</h3>
        <ul>
          <li>Admin Login</li>
          <li>Add Doctor</li>
          <li>View/Update/Delete Doctors</li>
          <li>View Patients</li>
          <li>Delete Patient</li>
          <li>View All Appointments</li>
          <li>View All Prescriptions</li>
        </ul>
      </div>

      <div className="doctor-section">
        <h3>Doctor</h3>
        <ul>
          <li>Doctor Login</li>
          <li>View/Update Profile</li>
          <li>View Appointments</li>
          <li>Update Appointment Status</li>
          <li>Add Prescription</li>
          <li>View Patient History</li>
        </ul>
      </div>

      <div className="patient-section">
        <h3>Patient</h3>
        <ul>
          <li>Registration</li>
          <li>Patient Login</li>
          <li>View/Update Profile</li>
          <li>Book Appointment</li>
          <li>View Booked Appointments</li>
          <li>View Prescriptions</li>
          <li>View Available Doctors</li>
        </ul>
      </div>
      
    </div>
  );
}
