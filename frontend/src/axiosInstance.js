import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // Backend server URL
});

export default axiosInstance;
