import axios from "axios";
import { signOut } from "../stores/useAuthStore";
import { useToastStore } from "../components/Toast/ToastStore";

const api = axios.create({
  baseURL: "http://192.168.1.85:3000",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useToastStore.getState().addToast("Session expired. Please log in again.", "error");
      signOut();
    }
    return Promise.reject(error);
  }
);

export default api;