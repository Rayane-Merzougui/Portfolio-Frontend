import axios from "axios";

const getBaseURL = () => {
  if (import.meta.env.PROD) {
    return "https://portfolio-backend-byfd.onrender.com";
  } else {
    return import.meta.env.VITE_API_URL || "http://localhost:8000";
  }
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour préfixer automatiquement les endpoints en production
api.interceptors.request.use(
  (config) => {
    // En production, ajouter /api.php devant l'URL sauf si elle commence déjà par /api.php
    if (import.meta.env.PROD && !config.url.startsWith("/api.php")) {
      config.url =
        "/api.php" +
        (config.url.startsWith("/") ? config.url : "/" + config.url);
    }

    if (!import.meta.env.PROD) {
      console.log(
        `API Request: ${config.method?.toUpperCase()} ${config.baseURL}${
          config.url
        }`
      );
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });

    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
