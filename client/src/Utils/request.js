
import axios from "axios";



const request = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

console.log("Axios Base URL:", import.meta.env.VITE_API_URL);


export default request;