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

      const response = await fetch(url, params);
      const result = await response.json();
      return result;

    } catch (error) {
      console.log();
      return { msg: `🚀 ~ User ~ postSignUp ~ error:", ${error}`, status: false };
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

      const response = await fetch(url, params);
      const result = await response.json();
      return result;

    } catch (error) {
      console.log();
      return { msg: `🚀 ~ User ~ postSignIn ~ error:, ${error}`, status: false };
    }
  }

  async refreshAccessToken(refreshToken) {

      const url = `${HOST}/${API_VERSION}/auth/refresh_access_token`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        body: JSON.stringify({ token: refreshToken }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;
      return result;

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
