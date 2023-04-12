import axios from "axios";

const api = axios.create({
  baseURL: "https://kaika-hse.vercel.app",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      if (token && config.headers)
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default api;
