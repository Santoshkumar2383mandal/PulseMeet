import axios from "axios";

// Use environment variable in production, fallback to localhost in dev
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true // send cookies with every request
});
