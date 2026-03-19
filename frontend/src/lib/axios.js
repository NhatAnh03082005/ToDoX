import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";

const api = axios.create({
  // In production this should resolve to the same origin (e.g. https://your-domain.com/api).
  baseURL: BASE_URL,
});

export default api;
