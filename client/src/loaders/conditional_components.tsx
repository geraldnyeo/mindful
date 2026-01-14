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

export {
    DashboardComponent
}