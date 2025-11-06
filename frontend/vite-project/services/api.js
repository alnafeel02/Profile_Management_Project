import axios from "axios";
const API = axios.create({
  baseURL: import.meta.env.PUBLIC_API_URL,
});
export default API;
