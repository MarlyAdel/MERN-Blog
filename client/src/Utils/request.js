
import axios from "axios";

console.log("✅ request.js is loaded!");

const request = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

console.log("Axios Base URL:", import.meta.env.VITE_API_URL);


export default request;