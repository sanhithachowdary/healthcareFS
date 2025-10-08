import { BrowserRouter as Router } from "react-router-dom";
import MainNavBar from './main/MainNavBar';
import AdminNavBar from "./admin/AdminNavBar";
import PatientNavBar from "./patient/PatientNavBar";
import DoctorNavBar from "./doctor/DoctorNavBar";
import { AuthProvider, useAuth } from './contextapi/AuthContext';

function AppContent() {
  const { isAdminLoggedIn, isPatientLoggedIn, isDoctorLoggedIn } = useAuth();

  return (
    <Router>
      {isAdminLoggedIn ? (
        <AdminNavBar />
      ) : isPatientLoggedIn ? (
        <PatientNavBar />
      ) : isDoctorLoggedIn ? (
        <DoctorNavBar />
      ) : (
        <MainNavBar />
      )}
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
