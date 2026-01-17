import { useLoaderData } from "react-router"

import "./eventPage.css"

import EventDetails from "../../components/EventDetails/EventDetails";
import EventAdmin from "../../components/EventAdmin/EventAdmin";
import EventVolunteers from "../../components/EventVolunteers/EventVolunteers";

import DataService from "../../services/DataService";

type EventSaveStatus = {
    "success": boolean,
    "error": string | null
}

function EventPage() {
    const { role, event } = useLoaderData();

    async function saveCallback(data: any): Promise<EventSaveStatus> {
        try {
            await DataService.putEvent({
                ...event,
                ...data
            })
            return { "success": true, error: "" }
        } catch (error) {
            return { "success": false, error: "Unable to save data." }
        }
    }

    return (
        <div>
            {/* TODO: Reduce event props scopes for each component */}
            <EventDetails event={event} editable={role === "admin"} saveCallback={saveCallback} />
            <EventAdmin event={event} editable={role === "admin"} saveCallback={saveCallback} />
            {(role === "admin" || role === "volunteer") &&
                <EventVolunteers volunteers={event.volunteers} role={role} saveCallback={saveCallback} />
            }
        </div>
    )
}

export default EventPage

export type {
    EventSaveStatus
}