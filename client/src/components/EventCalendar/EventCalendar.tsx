import { useNavigate } from "react-router"

import "./eventCalendar.css"

/*
IMPORTANT NOTE
EventCalendar does NOT handle data fetching. 
All required data is passed to event calendar as props.
It can be fetch in the page or from a loader.

EventCalendar will be the only component which interacts with EventCards
So it is the only thing which needs EventCardProps and EventCardDetails
*/

import EventCard from "../EventCard/EventCard"
import type { EventShort } from "../../services/DataService";
import type { userRole } from "../../services/UserService";

type EventCalendarProps = {
    role: userRole,
    events: EventShort[],
    firstDay: Date,
}

function EventCalendar({ role, events, firstDay }: EventCalendarProps) {
	const navigate = useNavigate();

    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0).getDate();
	const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    function event_click_handler(eventid) {
		if (role === "admin") {
			// open sidebar
		} else {
			navigate(`/event/${eventid}`);
		}
    }

    return (
        <div className="event-calendar">
            <div className="event-calendar-header">
		{daysOfWeek.map((day, i) => (
			<div key={i} className="event-calendar-day-name">{day}</div>
		))}
            </div>
            <div className="event-calendar-body">
                {[...Array(firstDayOfWeek)].map((_, i) => (
                    <div key={i} className="event-calendar-day-empty" />
                ))}
                {[...Array(daysInMonth)].map((_, i) => (
                    <div key={i} className="event-calendar-day">
			<p>{i + 1}</p>
                        {events.filter(event => event.startTime.getDate() === i + 1)
                            .map((event, i) => (
                                <EventCard event={event} click_handler={event_click_handler} />
                            ))
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EventCalendar