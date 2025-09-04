
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')

  const BASE_URL = import.meta.env.VITE_BACKEND_URL

 
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/login`, { email, password });

      setUser(data.user);
      setToken(data.token);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return { success: true };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

const signup = async (name, email, password) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/signup`, {
      name,
      email,
      password,
    });

    setSuccess(true);
    setMessage(data?.message || "Signup successful");
    setError(null);

  } catch (err) {
    console.error(err);
    setError(err.response?.data?.message || "Signup failed");
    setSuccess(false);
    setMessage("");
  }
};



  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, setLoading, 
     loading, setError, error, success, setSuccess,
     message, setMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
};
