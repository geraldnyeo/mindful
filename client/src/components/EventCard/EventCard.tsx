import "./eventCard.css"

/**
 * Details required by EventCard only, i.e., public details
 */
type EventCardDetail = {
    name: string,
    date: string,
    time: string,
    location: string,
    meeting_point: string
}

type EventCardProps = {
    event: EventCardDetail
    click_handler: () => void
}

/**
 * Single Event detail card with basic information only
 * Opens up sidebar (admin mode) or redirects to new page (participant/volunteer)
 */
function EventCard({ event, click_handler }: EventCardProps) {
    function handleClick(e: React.MouseEvent<HTMLDivElement>) {
	e.preventDefault();
	console.log("EventCard clicked!");
	click_handler();
    }

    return (
        <div onClick={handleClick}>
	    <h3>{event.name}</h3>
	    <p>Location: {event.location}</p>
	    <p>Time: {event.time}</p>
	    <p>Meeting Point: {event.meeting_point}</p>
        </div>
    )
}

export default EventCard

export type  {
    EventCardDetail,
    EventCardProps
}