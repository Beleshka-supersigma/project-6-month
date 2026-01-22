import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuth: false,

  setAuth: ({ user, accessToken, refreshToken }) => {
    set({
      user,
      accessToken,
      refreshToken,
      isAuth: true,
    });

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  },

  logout: () => {
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuth: false,
    });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
}));
