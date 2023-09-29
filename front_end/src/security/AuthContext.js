import { createContext, useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import axios from "axios";

//1: Create a Context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

//2: Share the created context with other components
export default function AuthProvider({ children }) {
  //3: Put some state in the context
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [isUser, setUser] = useState(false);
  const [isDeliver, setDeliver] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function demo() {
      const data = window.localStorage.getItem("token");
      const username = window.localStorage.getItem("username");
      console.log("data", data);
      console.log("username", username);
      setUsername(username);
      setAccessToken(data);
      setAuthenticated(true);
      const decodedToken = jwtDecode(data);
      if (decodedToken.role === "USER") {
        setUser(true);
      } else if (decodedToken.role === "DELIVERY_MAN") {
        setDeliver(true);
      } else if (decodedToken.role === "ADMIN") {
        setAdmin(true);
      }
    }
    window.addEventListener("load", demo);
  }, []);

  async function login(usernameOrEmail, password) {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          usernameOrEmail,
          password,
        }
      );
      setUsername(usernameOrEmail);

      if (response.status === 200) {
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        setAuthenticated(true);
        window.localStorage.setItem("token", response.data.accessToken);
        window.localStorage.setItem("username", usernameOrEmail);
        const decodedToken = jwtDecode(response.data.accessToken);

        if (decodedToken.role === "USER") {
          setUser(true);
        } else if (decodedToken.role === "DELIVERY_MAN") {
          setDeliver(true);
        } else if (decodedToken.role === "ADMIN") {
          setAdmin(true);
        }

        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      console.log(error);
      logout();
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
    setAdmin(false);
    setUser(false);
    setDeliver(false);
    setAccessToken(null);
    setRefreshToken(null);
    window.localStorage.clear();
  }

  function autoLogin() {
    const token = Cookies.get("token");
    const decodedToken = jwtDecode(token);
    setAccessToken(token);
    setAuthenticated(true);
    if (decodedToken.role === "USER") {
      setUser(true);
    } else if (decodedToken.role === "DELIVERY_MAN") {
      setDeliver(true);
    } else if (decodedToken.role === "ADMIN") {
      setAdmin(true);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        login,
        logout,
        accessToken,
        isAdmin,
        isDeliver,
        isUser,
        autoLogin,
        setAccessToken,
        setAuthenticated,
        setUser,
        setDeliver,
        setAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
