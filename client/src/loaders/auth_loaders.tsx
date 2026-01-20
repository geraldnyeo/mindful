import { redirect } from "react-router";

import AuthService from "../services/AuthService"
import type { userRole } from "../services/UserService"

/**
 * Redirects to /auth/login if the user is not logged in
 * Gets user role for conditional loading
 * @returns {{ userRole: userRole }} The role of the user
 */
function protectedRoute(): { userRole: userRole } {
    const role = AuthService.getUserRole();
    if (role === "guest") {
        throw redirect("/auth/login");
    }
    return { userRole: role }
}

/**
 * Redirects to /auth/login if the user is not admin
 */
function adminRoute(): { userRole: userRole } {
    const role = AuthService.getUserRole();
    if (role !== "admin") {
        throw redirect("/error/401-unauthorized");
    }
    return { userRole: role };
}

/**
 * Redirects to /auth/login if the user is not a participant
 */
function participantRoute(): { userRole: userRole } {
    const role = AuthService.getUserRole();
    if (role !== "participant") {
        throw redirect("/error/401-unauthorized");
    }
    return { userRole: role };
}

/**
 * Redirects to /auth/login if the user is not a volunteer
 */
function volunteerRoute(): { userRole: userRole } {
    const role = AuthService.getUserRole();
    if (role !== "volunteer") {
        throw redirect("/error/401-unauthorized");
    }
    return { userRole: role };
}

export {
    protectedRoute,
    adminRoute,
    participantRoute,
    volunteerRoute
}