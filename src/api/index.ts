import axios from "axios";
import { API_BASE_URL } from "@env";

const api = axios.create({
  baseURL: "http://192.168.100.7:8000",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
