import { useLoaderData } from "react-router"

import "./calendarPage.css"

import EventCalendar from "../../components/EventCalendar/EventCalendar"

function CalendarPage() {
    const { userRole, events, firstDay } = useLoaderData();

    return (
        <div className="calendar-page-root">
	        <EventCalendar role={userRole} events={events} firstDay={firstDay} />
        </div>
    )
}

export default CalendarPage