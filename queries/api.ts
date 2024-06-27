import { getData } from "@/utils/storage";
import axios from "axios";
import i18n from "@/languages/i18n";
//todo: Ver si se puede usar env in rn
const url = false;
//192.168.100.52
//https://9b4e-181-126-32-247.ngrok-free.app/
//http://localhost:8000/api/
//https://api.refme.dlab.software/api/
export const baseURL = url ? url : "https://api.refme.dlab.software/api/";
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL });

const handleError = (error: any) => {
  if (error?.response?.status == 401) {
  }
  let errorMessage = "";
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (Array.isArray(error.response.data)) {
      errorMessage = error.response.data[0];
    } else if (Object.keys(error.response.data).length) {
      errorMessage = Object.values(error.response.data)[0] as string;
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js

    errorMessage = i18n.t("request_error");
  } else {
    // Something happened in setting up the request that triggered an Error
    errorMessage = i18n.t("unknown_error");
  }
  console.log("error en el server", errorMessage);
  return Promise.reject(errorMessage);
};

api.interceptors.response.use((response) => response, handleError);
export default api;
