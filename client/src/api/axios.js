import axios from "axios";

const defaultBaseURL = import.meta.env.MODE === "development" ? "http://localhost:5001/api/v1" : "/api/v1";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || defaultBaseURL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
