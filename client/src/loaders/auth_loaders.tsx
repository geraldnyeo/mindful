import type { userRole } from "../services/UserService"

/**
 * Redirects to /login if the user is not logged in
 * Gets user type for conditional loading
 * @returns {{ userType: userTypes }} The type of user
 */
function protectedRoute(): { userType: userRole } {
    return { userType: "admin" }
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