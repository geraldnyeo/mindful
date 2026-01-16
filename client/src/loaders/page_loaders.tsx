import type { LoaderFunctionArgs } from "react-router"

import type { Event } from "../services/DataService"
import type { userRole } from "../services/UserService"

/**
 * Redirect to /dashboard if the user is logged in
 * @returns {{ userType: userTypes }} The type of user
 */
function indexLoader(): { userType: userRole } {
    return { userType: "admin" }
}

/**
 * Gets the user type for conditional loading
 * @returns {{ userType: userTypes }} The type of user
 */
function dashboardLoader(): { userType: userRole } {
    return { userType: "admin" }
}

/**
 * Loader for /calendar
 * @returns events //todo
 */
function calendarLoader() {
    return {
	events: []
    }
}

/**
 * Loader for /event/eventid
 * @returns events //todo
 */ 
function eventLoader({ params }: LoaderFunctionArgs) {
    return {
        date: "16/01/2026",
        name: "Nature Walk"
    }
}

export {
    indexLoader,
    dashboardLoader,
    calendarLoader,
    eventLoader
}