import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const login = async (input) => {
    const res = await axios.post(
      "https://my-biloog-server.onrender.com/api/auth/login",
      input,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    setUser(res.data);
  };

  const logout = async () => {
    const res = await axios.get("https://my-biloog-server.onrender.com/api/auth/logout", {
      withCredentials: true,
    });
    console.log(res);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};