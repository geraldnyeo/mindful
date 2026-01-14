import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

/**
 * Authentication Service
 * Handles login/signup requests, and login status / token fetching
 */
class AuthService {
    /**
     * Sends signup request to backend
     */
    signup() {
        axios.get("")
    }

    /**
     * Sends login request to backend
     */
    login() {

    }

    /**
     * Fetches session token
     */
    getToken() {

    }
}

export default new AuthService()