import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Success() {
  const location = useLocation();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(null);

  const sessionId = new URLSearchParams(location.search).get('session_id');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (sessionId) {
      if (!token) {
        setError("Authorization token is missing.");
        setLoading(false);
        return;
      }

      fetch(`http://localhost:2027/appointment/success?session_id=${sessionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setPaymentDetails(data);
          }
          setLoading(false);
        })
        .catch(err => {
          setError("Error fetching payment details.");
          setLoading(false);
        });
    } else {
      setError("No session ID found.");
      setLoading(false);
    }
  }, [sessionId, yourAuthToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Payment Successful!</h1>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      {paymentDetails ? (
        <div>
          <p><strong>Payment ID:</strong> {paymentDetails.paymentId}</p>
          <p><strong>Amount:</strong> ₹{paymentDetails.amount / 100}</p>
          <p><strong>Doctor:</strong> {paymentDetails.doctorName}</p>
          <p><strong>Appointment Date:</strong> {paymentDetails.appointmentDate}</p>
        </div>
      ) : (
        <p>No payment details available.</p>
      )}
    </div>
  );
}
    