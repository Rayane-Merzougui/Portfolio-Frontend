import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isProduction =
    import.meta.env.PROD || window.location.hostname !== "localhost";

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const endpoint = isProduction ? "/api.php/me" : "/me";
        const response = await api.get(endpoint);
        console.log("Auth check response:", response.data);
        setUser(response.data.user);
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [isProduction]);

  const login = async (email, password) => {
    const endpoint = isProduction ? "/api.php/login" : "/login";
    const { data } = await api.post(endpoint, { email, password });
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password) => {
    const endpoint = isProduction ? "/api.php/register" : "/register";
    const { data } = await api.post(endpoint, { name, email, password });
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    const endpoint = isProduction ? "/api.php/logout" : "/logout";
    await api.post(endpoint);
    setUser(null);
  };

  const uploadAvatar = async (file) => {
    if (isProduction) {
      const base64Image = await convertToBase64(file);
      const endpoint = "/api.php/upload_avatar";
      const { data } = await api.post(endpoint, {
        avatar_base64: base64Image,
      });
      setUser((u) => ({ ...u, avatar_url: data.avatar_url }));
    } else {
      const form = new FormData();
      form.append("avatar", file);
      const endpoint = "/upload_avatar";
      const { data } = await api.post(endpoint, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser((u) => ({ ...u, avatar_url: data.avatar_url }));
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, uploadAvatar }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
