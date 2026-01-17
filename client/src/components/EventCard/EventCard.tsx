import "./eventCard.css"

/**
 * Details required by EventCard only, i.e., public details
 */
type EventCardFields = {
    id: string
    title: string,
    location: string,
    startTime: string,
}

type EventCardProps = {
    event: EventCardFields
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
	    <h3>{event.title}</h3>
	    <p>Location: {event.location}</p>
	    <p>Time: {event.startTime}</p>
        </div>
    )
}

export default EventCard

export type  {
    EventCardFields,
    EventCardProps
}