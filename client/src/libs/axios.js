import axios from "axios";

const URL = "https://chatly-6sh0.onrender.com/api";
//const URL = "http://localhost:3001/api";

const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  return config;
});

export default axiosInstance;
