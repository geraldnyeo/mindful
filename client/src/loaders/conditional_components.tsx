import { useLoaderData } from "react-router";

import type { ComponentType } from "react"

import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import ParticipantDashboard from "../pages/ParticipantDashboard/ParticipantDashboard";
import VolunteerDashboard from "../pages/VolunteerDashboard/VolunteerDashboard";

/**
 * Conditionally renders dashboard based on user type
 */
function DashboardComponent(): ComponentType  {
  const { userType } = useLoaderData();
  const c = userType === "admin"
    ? <AdminDashboard />
    : userType === "participant"
    ? <ParticipantDashboard />
    : userType === "volunteer"
    ? <VolunteerDashboard />
    : <></>

  return () => c
}

export {
    DashboardComponent
}