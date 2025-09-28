import axios from "axios";
import { signOut } from "../stores/useAuthStore";
import { useToastStore } from "../components/Toast/ToastStore";

const api = axios.create({
  baseURL: "http://192.168.1.85:3000",
});

api.interceptors.request.use((config) => {
  if (config.method?.toLowerCase() === "get") {
    const query = config.params
      ? "?" + new URLSearchParams(config.params as Record<string, string>).toString()
      : "";
    console.log(`➡️ GET ${config.baseURL}${config.url}${query}`);
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response.config.url, response.config.params, response.status);
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      useToastStore.getState().addToast("Session expired. Please log in again.", "error");
      signOut();
    }
    return Promise.reject(error);
  }
);



export default api;