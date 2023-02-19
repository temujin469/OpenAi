import axios from "axios";
const baseUrl = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});

export default baseUrl;
