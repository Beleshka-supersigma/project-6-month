import { create } from "zustand";
import { api } from "../api/axios";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  isAuth: !!localStorage.getItem("accessToken"),
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/auth/login", credentials);
      const { accessToken, refreshToken, user } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user)); // ✅ сохраняем юзера

      set({
        user,
        accessToken,
        refreshToken,
        isAuth: true,
        isLoading: false,
      });

      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        isLoading: false,
        isAuth: false,
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

  getProfile: async () => {
    const res = await api.get("/profile");
    set({ profile: res.data });
  },

  setUser: (user) => set({ user, isAuth: !!user }),

  logout: () => {
    localStorage.clear();
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuth: false,
    });
  },
}));
