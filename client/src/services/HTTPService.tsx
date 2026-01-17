import { redirect } from "react-router"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    withCredentials: true
});

api.interceptors.response.use(
    res => res,
    err => {
    if (err.response) {
        if (err.response.status === 401) {
            redirect("/error/401-unauthorized")
        } else if (err.response.status === 404) {
            redirect("/error/404-resource-not-found")
        } else if (err.response.status === 500) {
            redirect("/error/500-internal-server-error")
        }
    }
	return Promise.reject(err);
    }
)

export default api;