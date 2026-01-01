import axios from "axios";

const getBaseURL = () => {
  if (import.meta.env.PROD) {
    return "https://portfolio-backend-byfd.onrender.com/api.php";
  }
  return import.meta.env.VITE_API_URL || "http://localhost:8000/api.php";
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
