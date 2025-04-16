import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5003/api"
      : "https://chat-app-full-1-k206.onrender.com",
  withCredentials: true,
});
