import { useState, useEffect } from 'react';
import axios from './axiosInstance';
import './Form.css';

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    dob: '',
    age: '',
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get('/countries').then(response => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    if (formData.country) {
      axios.get(`/states?country=${formData.country}`).then(response => {
        setStates(response.data);
        setFormData(prevState => ({ ...prevState, state: '', city: '' }));
      });
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.state) {
      axios.get(`/cities?state=${formData.state}`).then(response => {
        setCities(response.data);
        setFormData(prevState => ({ ...prevState, city: '' }));
      });
    }
  }, [formData.state]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));

    // Calculate age based on DOB
    if (name === 'dob') {
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      setFormData(prevState => ({ ...prevState, age }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        await axios.post('/save', formData);
        setTimeout(() => {
          window.location.href = '/savedFormData';
        }, 1000);
      } catch (error) {
        console.error(error);
        alert('Error saving data');
      }
    }
  };  

  const validateForm = () => {
    const nameRegex = /^[a-zA-Z]+$/; // Regex for alphabets only
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for valid email format
  
    // Validate First Name
    if (!formData.firstName.match(nameRegex)) {
      alert('First Name should contain only alphabets.');
      return false;
    }
  
    // Validate Last Name
    if (!formData.lastName.match(nameRegex)) {
      alert('Last Name should contain only alphabets.');
      return false;
    }
  
    // Validate Email
    if (!formData.email.match(emailRegex)) {
      alert('Please enter a valid email address.');
      return false;
    }
  
    // Validate Date of Birth
    const dobDate = new Date(formData.dob);
    const currentDate = new Date();
    const minAgeDate = new Date(currentDate.getFullYear() - 99, currentDate.getMonth(), currentDate.getDate());
    const maxAgeDate = new Date(currentDate.getFullYear() - 14, currentDate.getMonth(), currentDate.getDate());
  
    if (dobDate < minAgeDate || dobDate > maxAgeDate) {
      alert('Age must be between 14 and 99 years.');
      return false;
    }
  
    return true;
  };
  

  return (
    <div className="form-container">
      <h1 className="form-heading">Form Validation</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Country</label>
          <select name="country" value={formData.country} onChange={handleChange} required>
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>State</label>
          <select name="state" value={formData.state} onChange={handleChange} required>
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>City</label>
          <select name="city" value={formData.city} onChange={handleChange} required>
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.code} value={city.code}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Gender</label>
          <div className="radio-group">
            <label>
              <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} required /> Male
            </label>
            <label>
              <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} required /> Female
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="text" name="age" value={formData.age} readOnly />
        </div>
        <div className="form-group">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
