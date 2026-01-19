import "./eventCard.css"

import type { EventShort } from "../../services/DataService";

type EventCardProps = {
    event: EventShort,
    click_handler: (eventid: string) => void
}

/**
 * Single Event detail card with basic information only
 * Opens up sidebar (admin mode) or redirects to new page (participant/volunteer)
 */
function EventCard({ event, click_handler }: EventCardProps) {
    function handleClick(e: React.MouseEvent<HTMLDivElement>) {
	    e.preventDefault();
	    console.log("EventCard clicked!");
	    click_handler(event.id);
    }

    return (
        <div className="event-card" onClick={handleClick}>
            <h3>{event.title}</h3>
            <p>Location: {event.location}</p>
            <p>Time: {event.startTime.toLocaleTimeString()} - {event.endTime.toLocaleTimeString()}</p>
        </div>
    )
}

export default EventCard

export type  {
    EventCardProps
}