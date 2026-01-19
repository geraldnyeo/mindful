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
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0).getDate();

    function test_click_handler() {
		    console.log("Click handler run from Event Card!");
    }

    return (
        <div className="event-calendar">
            <div className="event-calendar-header">

            </div>
            <div className="event-calendar-body">
                {[...Array(firstDayOfWeek)].map((_, i) => (
                    <div key={i} className="event-calendar-day" />
                ))}
                {[...Array(daysInMonth)].map((_, i) => (
                    <div key={i} className="event-calendar-day">
                        {events.filter(event => event.startTime.getDate() === i + 1)
                            .map((event, i) => (
                                <EventCard event={event} click_handler={test_click_handler} />
                            ))
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EventCalendar