import { redirect } from "react-router"

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
     * Fetches user role
     */
    getUserRole() {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user: User = JSON.parse(userData);
            return user.role;
        } else {
            return "guest"
        }
    }

    /**
     * Fetches user data (all)
     */
    getUser() {
        const userData = localStorage.getItem("user");
        if (userData) {
            const user: User = JSON.parse(userData);
            return user;
        } else {
            return null
        }
    }

}

export default new AuthService()

export type {
    SignupData,
    LoginData,
}