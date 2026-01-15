import { redirect } from "react-router"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000
});

api.interceptors.response.use(
    res => res,
    err => {
	if (error.response.status === 401) {
	    redirect("/error/401-unauthorized")
	}
	return Promise.reject(error);
    }
)

export default api;