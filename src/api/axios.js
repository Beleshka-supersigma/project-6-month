import axios from "axios";

export const api = axios.create({
  baseURL: "https://nu.tipo.lol/api",
  headers: {
    "Content-Type": "application/json",
  },
});
