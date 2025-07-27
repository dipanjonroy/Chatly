import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: "https://real-time-chat-beryl.vercel.app/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired.");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
