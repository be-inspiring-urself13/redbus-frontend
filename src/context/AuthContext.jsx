import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔥 LOAD USER ON APP START
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setUser(res.data.user); // 🔥 VERY IMPORTANT
  };

  const signup = async (name, email, password) => {
  return await api.post("/auth/register", {
    name,
    email,
    password,
  });
};

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // ❌ CLEAR PASSENGER AUTO-FILL (PERMANENT)
    localStorage.removeItem("passengerInfo");
    localStorage.removeItem("contactInfo");

    // ❌ CLEAR TEMP BOOKING DATA
    localStorage.removeItem("passengerInfo_temp");
    localStorage.removeItem("contactInfo_temp");

    // ❌ CLEAR EMAIL USED FOR LOGIN VALIDATION
    localStorage.removeItem("passengerEmail");

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);