import api from "./HTTPService"
import type { User, userRole } from "./UserService"

interface SignupData {
    email: string,
    name: string,
    pw: string,
    role: userRole
}

interface LoginData {
    email: string,
    pw: string
}

/**
 * Authentication Service
 * Handles login/signup requests, and login status / token fetching
 */
class AuthService {
    /**
     * Sends signup request to backend
     */
    signup(data: SignupData) {
        api.post("api/auth/signup", data)
        .then(res => {
            const user: User = res.data;
            console.log(user);
            localStorage.setItem('user', JSON.stringify(user));
        })
        .catch(err => {
            console.log(err);
            // TODO
        })
    }

    /**
     * Sends login request to backend
     */
    login(data: LoginData) {
        api.post("api/auth/login", data)
        .then(res => {
            const user: User = res.data;
            localStorage.setItem('user', JSON.stringify(user));
        })
        .catch(err => {
            console.log(err);
            // TODO
        })
    }

    /**
     * Fetches session token
     */
    getToken() {
        // TODO: Retrieve cached token data
    }

    // TODO: User data fetching functions
}

export default new AuthService()

export type {
    SignupData,
    LoginData
}