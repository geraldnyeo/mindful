import { useLoaderData } from "react-router";

import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import ParticipantDashboard from "../pages/ParticipantDashboard/ParticipantDashboard";
import VolunteerDashboard from "../pages/VolunteerDashboard/VolunteerDashboard";

/**
 * Conditionally renders dashboard based on user type
 */
function DashboardComponent() {
    const { userType } = useLoaderData();
    
    return (
        <>
            { userType === "admin"
                ? <AdminDashboard />
                : userType === "participant"
                ? <ParticipantDashboard />
                : userType === "volunteer"
                ? <VolunteerDashboard />
                : <></>
            }
        </>
    )
}

/**
 * Conditionally fetch and render calendar data based on user type
 */
function CalendarComponent() {
    const { userType } = useLoaderData();

    // TODO: fetch data based on user type

    // TODO: conditionally render components based on user type
    return (
        <div>

        </div>
    )

}

export {
    DashboardComponent
}