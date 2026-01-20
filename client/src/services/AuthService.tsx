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
     * @throws Error with message if signup fails
     * @returns Promise<User> - User data from backend
     */
    async signup(data: SignupData): Promise<User> {
        try {
            const res = await api.post("api/auth/signup", data);
            const user: User = res.data;
            console.log("Signup successful:", user);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (err: any) {
            console.error("Signup error:", err);
            const errorMessage = err.response?.data?.error || err.message || "Signup failed";
            throw new Error(errorMessage);
        }
    }

    /**
     * Sends login request to backend
     * @throws Error with message if login fails
     * @returns Promise<User> - User data from backend
     */
    async login(data: LoginData): Promise<User> {
        try {
            const res = await api.post("api/auth/login", data);
            const user: User = res.data;
            console.log("Login successful:", user);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (err: any) {
            console.error("Login error:", err);
            const errorMessage = err.response?.data?.error || err.message || "Login failed";
            throw new Error(errorMessage);
        }
    }

    /**
     * Fetches user role
     * @returns userRole - Current user's role or "guest" if not authenticated
     */
    getUserRole(): userRole {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const user: User = JSON.parse(userData);
                return user.role;
            } catch (e) {
                console.error("Error parsing user data:", e);
                return "guest";
            }
        } else {
            return "guest"
        }
    }

    /**
     * Fetches user data (all)
     * @returns User | null - Current user data or null if not authenticated
     */
    getUser(): User | null {
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                const user: User = JSON.parse(userData);
                return user;
            } catch (e) {
                console.error("Error parsing user data:", e);
                return null;
            }
        } else {
            return null
        }
    }

    /**
     * Logout user - clear session and local storage
     */
    logout(): void {
        localStorage.removeItem('user');
        console.log("User logged out");
    }
}

export default new AuthService()

export type {
    SignupData,
    LoginData,
}