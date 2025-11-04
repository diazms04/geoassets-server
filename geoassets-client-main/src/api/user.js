import { API_VERSION, HOST } from "../utils";

export class User {

  async getMe(accessToken) {
    try {
      const url = `${HOST}/${API_VERSION}/user/me`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      return { msg: "Error al ejecutar getMe", status: false };
    }
  }

  async postSignUp(formData) {
    try {
      const url = `${HOST}/${API_VERSION}/auth/signup`;
      const params = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      };

      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      return { msg: `Error en postSignUp: ${error}`, status: false };
    }
  }

  async postSignIn(formData) {
    try {
      const url = `${HOST}/${API_VERSION}/auth/signin`;
      const params = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      };

      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      return { msg: `Error en postSignIn: ${error}`, status: false };
    }
  }


}
