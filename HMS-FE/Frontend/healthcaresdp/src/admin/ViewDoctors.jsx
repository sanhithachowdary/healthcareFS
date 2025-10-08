import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

export default function ViewDoctors() {
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
      console.error(err);
      setError("Failed to fetch doctors: " + (err.response?.data || err.message));
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ textAlign: "center", color: "black", fontWeight: "bolder" }}>
        <u>View All Doctors</u>
      </h3>

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
              <th>Gender</th>
              <th>Experience</th>
              <th>Specialization</th>
              <th>Qualification</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Bio</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.name}</td>
                <td>{doctor.username}</td>
                <td>{doctor.email}</td>
                <td>{doctor.gender}</td>
                <td>{doctor.experience}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.qualification}</td>
                <td>{doctor.phone}</td>
                <td>{doctor.address}</td>
                <td>{doctor.bio}</td>
                <td>{doctor.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
