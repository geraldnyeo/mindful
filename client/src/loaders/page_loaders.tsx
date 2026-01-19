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
function indexLoader() {
    const role = AuthService.getUserRole();
    if (!(role === "guest")) {
        return redirect("/dashboard")
    }
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
async function calendarLoader({ params }: LoaderFunctionArgs) {
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

        const events: Event[] = await DataService.getEventsByMonthAdmin(
            startDate.toLocaleDateString("en-GB"), 
            endDate.toLocaleDateString("en-GB")
        );

        return {
            userRole,
            events,
            firstDay: startDate,
        }
    } catch (error) {
        return redirect("/error/404-resource-not-found")
    }
}

/**
 * Loader for /event/eventid
 * @returns events //todo
 */ 
async function eventLoader({ params }: LoaderFunctionArgs){
    const userRole = AuthService.getUserRole();

    const { eventid } = params;
    if (!eventid) {
        return redirect("/error/404-resource-not-found");
    }

    const event: Event = await DataService.getEventById(eventid);
    
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