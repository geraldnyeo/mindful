import api from "./HTTPService"

type userRole = "admin" | "participant" | "volunteer" | "guest"

interface User {
    id: string,
    name: string,
    email: string,
    role: userRole,
    joinedDate: string
}

/**
 * User Service
 * Handles loading of event details, etc.
 */
class UserService {
}

export default new UserService()

export type {
    User,
    userRole
}