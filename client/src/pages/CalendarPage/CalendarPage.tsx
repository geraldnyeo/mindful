import { useLoaderData } from "react-router"

import "./calendarPage.css"

import EventCalendar from "../../components/EventCalendar/EventCalendar"

function CalendarPage() {
    const { events } = useLoaderData();

    return (
        <div>
	    <EventCalendar events={events} />
        </div>
    )
}

export default CalendarPage