import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: "https://real-time-chat-beryl.vercel.app/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  return config;
});

export default axiosInstance;
