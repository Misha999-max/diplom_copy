import axios from "axios";
import localStorageService from "./localStorage.service";
import config from "../config.json";

const httpAuth = axios.create({
  baseURL: config.apiEndpoint,
});

const authServises = {
  register: async ({ email, password }) => {
    const { data } = await httpAuth.post("auth/signUp", {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },
  login: async ({ email, password }) => {
    const { data } = await httpAuth.post("auth/signInWithPassword", {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },

  refresh: async () => {
    const { data } = await httpAuth.post("auth/token", {
      grant_type: "refresh_token",
      refresh_token: localStorageService.getRefreshToken(),
    });
    return data;
  },
};

export default authServises;
