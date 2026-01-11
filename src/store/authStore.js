import { create } from "zustand";
import { api } from "../api/axios";

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuth: false,
  isLoading: false,
  error: null,

  login: async (data) => {
    try {
      set({ isLoading: true, error: null });

      const res = await api.post("/auth/login", data);
      const { user, token } = res.data;

      set({
        user,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        isAuth: true,
        isLoading: false,
      });

      localStorage.setItem("accessToken", token.accessToken);
      localStorage.setItem("refreshToken", token.refreshToken);

      return true;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Login failed",
        isLoading: false,
      });
      return false;
    }
  },

  register: async (data) => {
    try {
      set({ isLoading: true, error: null });

      await api.post("/auth/register", data);

      set({ isLoading: false });
      return true;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Register failed",
        isLoading: false,
      });
      return false;
    }
  },
}));
