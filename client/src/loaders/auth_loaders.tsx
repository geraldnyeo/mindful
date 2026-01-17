import { redirect } from "react-router";

import AuthService from "../services/AuthService"
import type { userRole } from "../services/UserService"

/**
 * Redirects to /login if the user is not logged in
 * Gets user type for conditional loading
 * @returns {{ userType: userTypes }} The type of user
 */
function protectedRoute(): { userRole: userRole } {
    const role = AuthService.getUserRole();
    if (role === "guest") {
        redirect("/error/401-unauthorized");
    }
    return { userRole: role }
}

/**
 * Redirects to /dashboard if the user is not admin
 */
function adminRoute() {
}

/**
 * Redirects to /dashboard if the user is not admin
 */
function participantRoute() {
}

/**
 * Redirects to /dashboard if the user is not admin
 */
function volunteerRoute() {
}

export {
    protectedRoute,
    adminRoute,
    participantRoute,
    volunteerRoute
}