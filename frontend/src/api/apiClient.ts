import axios from "axios";

import {
  API_BASE_URL,
} from "./apiConfig";

import {
  getToken,
  removeToken,
} from "../utils/authStorage";

const apiClient =
  axios.create({

    baseURL:
      API_BASE_URL,

    timeout:
      15000,

    headers: {
      "Content-Type":
        "application/json",

      Accept:
        "application/json",
    },
  });

apiClient.interceptors.request.use(
  (config) => {

    const token =
      getToken();

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) =>
    response,

  (error) => {

    if (
      error.response?.status === 401
    ) {

      removeToken();

      const currentPath =
        window.location.pathname;

      if (
        currentPath.startsWith(
          "/admin"
        ) &&
        currentPath !==
          "/admin/login"
      ) {

        window.location.replace(
          "/admin/login"
        );
      }
    }

    return Promise.reject(
      error
    );
  }
);

export default apiClient;