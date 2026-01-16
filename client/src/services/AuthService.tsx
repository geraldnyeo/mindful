import api from "./HTTPService"

type SignupData = {
    username: string,
    password: string
}

type LoginData = {
    username: string,
    password: string
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
        api.post("signup", data)
        .then(res => {
            console.log(res);
            // TODO: Status handling
            // TODO: Unpack user data, token, and cache them
        })
        .catch(err => {
            console.log(err);
        })
    }

    /**
     * Sends login request to backend
     */
    login(data: LoginData) {
        api.post("login", data)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
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