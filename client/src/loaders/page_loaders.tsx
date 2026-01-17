import { redirect } from "react-router"
import type { LoaderFunctionArgs } from "react-router"

import AuthService from "../services/AuthService"
import DataService from "../services/DataService"
import type { Event } from "../services/DataService"
import type { userRole } from "../services/UserService"

/**
 * Redirect to /dashboard if the user is logged in
 * @returns {{ userType: userTypes }} The type of user
 */
function indexLoader(): { userRole: userRole } {
    const role = AuthService.getUserRole();
    return { userRole: role }
}

/**
 * Gets the user type for conditional loading
 * @returns {{ userType: userTypes }} The type of user
 */
function dashboardLoader(): { userRole: userRole } {
    const role = AuthService.getUserRole();
    return { userRole: role }
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
function eventLoader({ params }: LoaderFunctionArgs): {
    userRole: userRole,
    event: Event
} | void {
    const userRole = AuthService.getUserRole();

    const { eventid } = params;
    if (!eventid) {
        redirect("/error/404-resource-not-found")
        return;
    }
    const eventidInt = parseInt(eventid);
    if (isNaN(eventidInt)) {
        redirect("/error/404-resource-not-found")
        return;
    }
    const event: Event = DataService.getEventById(eventidInt);
    
    return {
        userRole,
        event
    };
}

export {
    indexLoader,
    dashboardLoader,
    calendarLoader,
    eventLoader
}