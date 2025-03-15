import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL || "http://localhost:9000/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;