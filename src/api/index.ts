import axios from "axios";
import { API_BASE_URL } from "@env";

const api = axios.create({
  baseURL: "https://9738-102-89-49-42.eu.ngrok.io/",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
