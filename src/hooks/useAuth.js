import { useMutation } from "@tanstack/react-query";
import { api } from "../api/axios";
import { useAuthStore } from "../store/authStore";

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (data) => api.post("/auth/login", data),
    onSuccess: (res) => {
      const { user, token } = res.data;
      setAuth({
        user,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data) => api.post("/auth/register", data),
  });
};
