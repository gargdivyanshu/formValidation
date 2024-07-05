import { useState, useEffect } from 'react';
import axios from './axiosInstance';

const SavedFormData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/savedFormData').then(response => {
      setData(response.data);
    });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="saved-data-container">
      <h1>Saved Form Data</h1>
      <p><strong>First Name:</strong> {data.firstName}</p>
      <p><strong>Last Name:</strong> {data.lastName}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Country:</strong> {data.country}</p>
      <p><strong>State:</strong> {data.state}</p>
      <p><strong>City:</strong> {data.city}</p>
      <p><strong>Gender:</strong> {data.gender}</p>
      <p><strong>Date of Birth:</strong> {data.dob}</p>
      <p><strong>Age:</strong> {data.age}</p>
    </div>
  );
};

export default SavedFormData;
