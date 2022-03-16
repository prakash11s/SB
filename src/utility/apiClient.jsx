import axios from "axios";
import { toast } from "react-toastify";
import { store } from "../store/index";
import { CLIENT_API_URL, USER_DISABLE_SHOW_ERROR_MSG } from "./constants";

const apiClient = axios.create({
  baseURL: CLIENT_API_URL,
});

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      store.dispatch({
        type: "LOGOUT",
      });
      //toast.error(USER_DISABLE_SHOW_ERROR_MSG);
    }
    return Promise.reject(error);
  }
);

export function setHeader(data = {}) {
  const state = store.getState();
  const options = {
    headers: {
      Authorization: `Bearer ${state?.auth?.user?.auth_token}`,
      ...data?.headers,
    },
    ...data?.params,
  };
  return options;
}

export default apiClient;
