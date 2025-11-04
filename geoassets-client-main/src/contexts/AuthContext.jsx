import { useState, useEffect, createContext } from "react";
import { User, Auth } from '../api';
import { hasExpiredToken } from "../utils";

const userController = new User();
const authController = new Auth();

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const accessToken = authController.getAccessToken();
      const refreshToken = authController.getRefreshToken();

      if (!accessToken || !refreshToken) {
        logout();
        setLoading(false);
        return;
      }

      if (hasExpiredToken(accessToken)) {
        if (hasExpiredToken(refreshToken)) {
          logout();
        } else {
          await reLogin(refreshToken);
        }
      } else {
        await loginWithToken(accessToken);
      }

      setLoading(false);
    })();
  }, []);

  const reLogin = async (refreshToken) => {
    try {
      const { accessToken } = await authController.refreshAccessToken(refreshToken);
      authController.setAccessToken(accessToken);
      await loginWithToken(accessToken);
    } catch (error) {
      console.error(error);
      logout();
    }
  };

  const loginWithToken = async (accessToken) => {
    try {
      const response = await userController.getMe(accessToken);
      delete response.msg.password;
      setUser(response.msg);
      setToken(accessToken);
    } catch (error) {
      console.error(error);
      logout();
    }
  };

const handleLogin = async (email, password) => {
  try {
    const result = await authController.postSignIn({ email, password });
    console.log("Respuesta postSignIn:", result); // log para depuración

    if (result.status) {
      // usar las claves correctas: access y refresh
      authController.setAccessToken(result.msg.access);
      authController.setRefreshToken(result.msg.refresh);
      await loginWithToken(result.msg.access);
      return { status: true };
    } else {
      return { status: false, msg: result.msg };
    }
  } catch (error) {
    console.error("Error en handleLogin:", error);
    return { status: false, msg: error.message || "Error de login" };
  }
};


  const logout = () => {
    setUser(null);
    setToken(null);
    authController.removeTokens();
  };

  const data = {
    accessToken: token,
    user,
    handleLogin,
    logout,
  };

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
