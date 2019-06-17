import decode from "jwt-decode";
const axios = require("axios");

export default class AuthHelperMethods {
  constructor(domain) {
    this.domain = domain || "http://localhost/5000";
  }

  login = (email, password) => {
    const user = {
      email: email,
      password: password
    };

    return axios.post("/api/auth/", user).then(res => {
      console.log("Logging in...");
      this.setToken(res.data.token);
      return Promise.resolve(res);
    });
  };

  loggedIn = () => {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  };

  isTokenExpired = token => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log("Expired check failed!");
      return false;
    }
  };

  setToken = idToken => {
    localStorage.setItem("id_token", idToken);
  };

  getToken = () => {
    return localStorage.getItem("id_token");
  };

  logout = () => {
    localStorage.removeItem("id_token");
  };

  getConfirm = () => {
    let answer = decode(this.getToken());
    console.log("Confirmed token");
    return answer;
  };
}
