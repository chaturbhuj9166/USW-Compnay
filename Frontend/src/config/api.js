import axios from "axios";

// यह चेक करेगा कि आप लोकल पर हो या लाइव रेंडर पर
const BASE_URL = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://usw-compnay.onrender.com";

const API = axios.create({
  baseURL: BASE_URL,
});

export default API;