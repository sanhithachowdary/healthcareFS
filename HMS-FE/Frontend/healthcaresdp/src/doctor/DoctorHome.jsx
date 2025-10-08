import { useState,useEffect } from 'react';

export default function DoctorHome() 
{
     const [doctor, setDoctor] = useState("");
     
     useEffect(() => {
       const storedDoctor = sessionStorage.getItem('doctor');
       if (storedDoctor) {
        setDoctor(JSON.parse(storedDoctor));
       }
     }, []);
     
  return (
    <div>
      <h3>Hello {doctor.name}</h3>
    </div>
  )
}