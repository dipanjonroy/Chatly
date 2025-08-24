import axios from "axios";

const URL = "https://real-time-chat-beryl.vercel.app/api";
//const URL = "http://localhost:3001/api";

const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  return config;
});

export default axiosInstance;
