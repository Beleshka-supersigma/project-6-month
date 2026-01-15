import axios from "axios";

export const api = axios.create({
  baseURL: "https://nu.tipo.lol/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      console.error("Network error:", error.message);
      return Promise.reject(
        new Error("Network error. Please check your connection.")
      );
    }

    if (error?.response?.status === 401 && !originalRequest.__retry) {
      originalRequest.__retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post("https://nu.tipo.lol/api/auth/refresh", {
          refreshToken,
        });

        localStorage.setItem("accessToken", res.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(originalRequest);
      } catch (e) {
        localStorage.clear();
        window.location.href = "/login";
        console.log(e);
      }
    }
    return Promise.reject(error);
  }
);
