import { redirect } from "react-router"
import type { LoaderFunctionArgs } from "react-router"

import AuthService from "../services/AuthService"
import DataService from "../services/DataService"
import type { Event, EventShort } from "../services/DataService"
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
function calendarLoader({ params }: LoaderFunctionArgs): {
    userRole: userRole,
    events: EventShort[],
    firstDay: Date,
} | void {
    const userRole = AuthService.getUserRole();
    const { monthyear } = params; // MM-YYYY
    if (!monthyear) { 
        redirect("/error/404-resource-not-found")
        return;
    }
    
    try {
        const parts = monthyear.split("-")
        const month = parseInt(parts[0]);
        const year = parseInt(parts[1]);
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const events: EventShort[] = DataService.getEventsByMonthAdmin(
            startDate.toLocaleDateString("en-GB"), 
            endDate.toLocaleDateString("en-GB")
        );

        return {
            userRole,
            events,
            firstDay: startDate,
        }
    } catch (error) {
        redirect("/error/404-resource-not-found")
        return;
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