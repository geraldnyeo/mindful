import EventCard from "../EventCard/EventCard"
import type { EventCardProps, EventCardDetail } from "../EventCard/EventCard"

import "./eventCalendar.css"

/*
IMPORTANT NOTE
EventCalendar does NOT handle data fetching. 
All required data is passed to event calendar as props.
It can be fetch in the page or from a loader.

EventCalendar will be the only component which interacts with EventCards
So it is the only thing which needs EventCardProps and EventCardDetails
*/

function EventCalendar() {
    const test_event: EventCardDetail = {
	name: "Nature Walk",
	date: "16/01/2026",
	time: "1630",
	location: "Bukit Batok Nature Reserve",
	meeting_point: "Bukit Batok MRT Station"
    }

    function test_click_handler() {
	console.log("Click handler run from Event Card!");
    }

    return (
        <div>
	    {/* Event Card testing */}
	    {/* TODO: Proper grid layout for calendar */}
	    <EventCard event={test_event} click_handler={test_click_handler} />
        </div>
    )
}

export default EventCalendar