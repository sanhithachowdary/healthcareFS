import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeletePatient() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  
  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${config.url}/admin/viewallpatients`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPatients(response.data);
    } catch (err) {
      setError("Failed to fetch patients: " + (err.response?.data || err.message));
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const deletePatient = async (patientid) => {
    console.log("Deleting patient with ID:", patientid);

    if (!patientid || isNaN(patientid)) {
      toast.error("Invalid patient ID.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(`${config.url}/admin/deletepatient?patientid=${patientid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success(response.data);
      fetchPatients(); // refresh list
    } catch (err) {
      toast.error("Deletion failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ textAlign: "center", color: "black", fontWeight: "bolder" }}>
        <u>Delete Patient</u>
      </h3>

      <ToastContainer position="top-center" autoClose={4000} />

      {error ? (
        <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "red" }}>
          {error}
        </p>
      ) : patients.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "gray" }}>
          No Patients Found
        </p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.patientid}>
                <td>{patient.patientid}</td>
                <td>{patient.name}</td>
                <td>{patient.username}</td>
                <td>{patient.email}</td>
                <td>{patient.gender}</td>
                <td>{patient.age}</td>
                <td>{patient.phone}</td>
                <td>{patient.address}</td>
                <td>{patient.role}</td>
                <td>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => deletePatient(patient.patientid)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
