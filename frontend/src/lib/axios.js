import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://pulsemeet-1.onrender.com/api";
export const axiosInstance = axios.create({
    // baseURL : "http://localhost:5001/api",
    baseURL :BASE_URL,
    withCredentials:true //send cookie with request
});