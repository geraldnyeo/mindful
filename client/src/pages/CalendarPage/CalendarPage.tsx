import { useLoaderData } from "react-router"

import "./calendarPage.css"

import EventCalendar from "../../components/EventCalendar/EventCalendar"
import EventView from "../../components/EventView/EventView";

function CalendarPage() {
    const { userRole, events, firstDay } = useLoaderData();

    return (
        <div className="calendar-page-root">
            <h1>Calendar</h1>
            <div className="calendar-view-wrapper">
                <EventCalendar role={userRole} events={events} firstDay={firstDay} />
            </div>
            <div className="calendar-event-wrapper">
                <EventView role={userRole} event={events[0]} />
            </div>
        </div>
    )
}

export default CalendarPage