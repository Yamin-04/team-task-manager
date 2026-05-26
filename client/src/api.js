import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-manager-backend-lrru.onrender.com/api",
});

export default API;