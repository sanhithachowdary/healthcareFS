import { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  });

  const [isPatientLoggedIn, setIsPatientLoggedIn] = useState(() => {
    return localStorage.getItem('isPatientLoggedIn') === 'true';
  });

  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(() => {
    return localStorage.getItem('isDoctorLoggedIn') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isAdminLoggedIn', isAdminLoggedIn);
    localStorage.setItem('isPatientLoggedIn', isPatientLoggedIn);
    localStorage.setItem('isDoctorLoggedIn', isDoctorLoggedIn);
  }, [isAdminLoggedIn, isPatientLoggedIn, isDoctorLoggedIn]);

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          console.log('Token expired. Logging out automatically.');
          localStorage.removeItem('token');
          localStorage.removeItem('isAdminLoggedIn');
          localStorage.removeItem('isPatientLoggedIn');
          localStorage.removeItem('isDoctorLoggedIn');
          window.location.href = '/login'; 
        }
      }
    };

    const interval = setInterval(checkTokenExpiry, 10000); // Checking for Every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        isPatientLoggedIn,
        setIsPatientLoggedIn,
        isDoctorLoggedIn,
        setIsDoctorLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
