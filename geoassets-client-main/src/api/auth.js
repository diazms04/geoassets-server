import { API_VERSION, HOST } from "../utils";

const API_KEY = import.meta.env.VITE_API_SECRET_KEY; 

export class Auth {

  async postSignUp(formData) {
    try {
      const url = `${HOST}/${API_VERSION}/auth/signup`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify(formData)
      };

      // --- LOG PARA DEPURACIÓN ---
      console.log("POST SIGNUP - URL:", url);
      console.log("POST SIGNUP - Headers:", params.headers);
      console.log("POST SIGNUP - Body:", params.body);

      const response = await fetch(url, params);
      const result = await response.json();
      return result;

    } catch (error) {
      console.log("🚀 ~ postSignUp ~ error:", error);
      return { msg: `Error en postSignUp: ${error}`, status: false };
    }
  }

  async postSignIn(formData) {
    try {
      const url = `${HOST}/${API_VERSION}/auth/signin`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify(formData)
      };

      // --- LOG PARA DEPURACIÓN ---
      console.log("POST SIGNIN - URL:", url);
      console.log("POST SIGNIN - Headers:", params.headers);
      console.log("POST SIGNIN - Body:", params.body);

      const response = await fetch(url, params);
      const result = await response.json();
      return result;

    } catch (error) {
      console.log("🚀 ~ postSignIn ~ error:", error);
      return { msg: `Error en postSignIn: ${error}`, status: false };
    }
  }

  async refreshAccessToken(refreshToken) {
    try {
      const url = `${HOST}/${API_VERSION}/auth/refresh_access_token`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({ token: refreshToken }),
      };

      // --- LOG PARA DEPURACIÓN ---
      console.log("REFRESH TOKEN - URL:", url);
      console.log("REFRESH TOKEN - Headers:", params.headers);
      console.log("REFRESH TOKEN - Body:", params.body);

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;
      return result;

    } catch (error) {
      console.log("🚀 ~ refreshAccessToken ~ error:", error);
      return { msg: `Error en refreshAccessToken: ${error}`, status: false };
    }
  }

  setAccessToken(token) {
    localStorage.setItem("access", token);
  }

  getAccessToken() {
    return localStorage.getItem("access");
  }

  setRefreshToken(token) {
    localStorage.setItem("refresh", token);
  }

  getRefreshToken() {
    return localStorage.getItem("refresh");
  }

  removeTokens() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }
}
