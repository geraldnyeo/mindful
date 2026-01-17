import { useLoaderData, useRouteLoaderData } from "react-router";

import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import ParticipantDashboard from "../pages/ParticipantDashboard/ParticipantDashboard";
import VolunteerDashboard from "../pages/VolunteerDashboard/VolunteerDashboard";

/**
 * Conditionally renders dashboard based on user type
 */
function DashboardComponent() {
    const { userRole} = useLoaderData();
    
    return (
        <>
            { userRole === "admin"
                ? <AdminDashboard />
                : userRole === "participant"
                ? <ParticipantDashboard />
                : userRole === "volunteer"
                ? <VolunteerDashboard />
                : <></>
            }
        </>
    )
}

export {
    DashboardComponent,
}