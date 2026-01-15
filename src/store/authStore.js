import { create } from "zustand";
import { persist } from "zustand/middleware"; // ДОБАВИЛ
import { api } from "../api/axios";

export const useAuthStore = create(
  persist(
    (set) => ({
      categories: [],
      isLoading: false,
      user: null,
      isAuth: false,
      error: null,

      getCategories: async () => {
        set({ isLoading: true });
        const res = await api.get("/categories");
        set({ categories: res.data, isLoading: false });
      },

      createCategory: async (title) => {
        try {
          const res = await api.post("/categories", { title });

          set((state) => {
            const updatedCategories = [...state.categories, res.data];

            return {
              categories: updatedCategories,
            };
          });

          return res.data;
        } catch (error) {
          console.error(error.response);
          throw error;
        }
      },

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.post("/auth/login", credentials);
          const { accessToken, refreshToken, user } = res.data;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          set({
            user: user,
            isAuth: true,
            isLoading: false,
          });
          return true;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Login failed",
            isLoading: false,
          });
          return false;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.post("/auth/register", userData);
          const { accessToken, refreshToken, user } = res.data;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          set({
            user: user,
            isAuth: true,
            isLoading: false,
          });
          return true;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Registration failed",
            isLoading: false,
          });
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        set({
          user: null,
          isAuth: false,
          categories: [],
          error: null,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuth: state.isAuth,
        categories: state.categories,
      }),
    }
  )
);
