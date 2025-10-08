import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import axios from "axios";
import config from "../config";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${config.url}/admin/viewalldoctors`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDoctors(response.data);
    } catch (err) {
      setError("Failed to fetch doctors: " + (err.response?.data || err.message));
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const deleteDoctor = async (doctorid) => {
    console.log("Deleting doctor with ID:", doctorid);

    if (!doctorid || isNaN(doctorid)) {
      toast.error("Invalid doctor ID.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(`${config.url}/admin/deletedoctor?doctorid=${doctorid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success(response.data);
      fetchDoctors(); // refresh list
    } catch (err) {
      toast.error("Deletion failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ textAlign: "center", color: "black", fontWeight: "bolder" }}>
        <u>Delete Doctor</u>
      </h3>

      <ToastContainer position="top-center" autoClose={4000} />

      {error ? (
        <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "red" }}>
          {error}
        </p>
      ) : doctors.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "gray" }}>
          No Doctors Found
        </p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Qualification</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.name}</td>
                <td>{doctor.username}</td>
                <td>{doctor.email}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.qualification}</td>
                <td>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteDoctor(doctor.id)}
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
