import axios from "axios";

const api = axios.create({
  baseURL: "https://inventory-backend-p5vv.onrender.com",
});

export default api;