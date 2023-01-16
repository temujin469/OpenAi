import axios from "axios";
const baseUrl = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default baseUrl;
