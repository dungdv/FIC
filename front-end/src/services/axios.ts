import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend-te0z.onrender.com",
  timeout: 5000,
});

export default axiosInstance;
