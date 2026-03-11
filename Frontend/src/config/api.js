import axios from "axios";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://usw-compnay.onrender.com";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export default API;