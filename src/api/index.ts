import axios from "axios";
import { API_BASE_URL } from "@env";

const api = axios.create({
  baseURL: "https://c4ab-102-89-55-149.eu.ngrok.io",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
