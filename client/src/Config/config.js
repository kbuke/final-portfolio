export const BASE_URL = import.meta.env.DEV
  ? "/api"
  : import.meta.env.VITE_BACKEND_URL ?? "https://final-portfolio-abxr.onrender.com";
