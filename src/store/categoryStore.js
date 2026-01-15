import { create } from "zustand";
import { api } from "../api/axios";

export const useCategoryStore = create((set) => ({
  categories: [],
  isLoading: false,

  getCategories: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/categories");
      set({
        categories: response.data,
        isLoading: false,
      });
    } catch (error) {
      console.error("Ошибка при загрузке категорий:", error);
      set({
        isLoading: false,
      });
    }
  },

  createCategory: async (title) => {
    try {
      const response = await api.post("/categories", { title });
      set((state) => ({
        categories: [...state.categories, response.data],
      }));
    } catch (error) {
      console.error("Ошибка при создании категории:", error);
      throw error;
    }
  },
}));
