import { useState } from "react"

import "./eventDetails.css"

import type { EventSaveStatus } from "../../pages/EventPage/EventPage"

type EventDetailsFields = {
    id: string,
    title: string,
    description: string,
    location: string,
    startTime: Date,
    endTime: Date,
    details: string
}

type EventDetailsProps = {
    event: EventDetailsFields,
    editable: boolean,
    saveCallback: (data: any) => Promise<EventSaveStatus> // TODO: some fancy Partial subtype thing for data
}

function EventDetails({ event, editable, saveCallback }: EventDetailsProps) {
    const [editing, setEditing] = useState<boolean>(false);
    const [eventDetails, setEventDetails] = useState<EventDetailsFields>(event);

    function handleClickCancel(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setEditing(false);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const result = await saveCallback(eventDetails);
        if (!result.success) {
            console.log(result.error);
            // TODO: Show user an error message or something.
        }
    }

    function handleClickEdit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (editable) {
            setEditing(true)
        }
    }

    function handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        // TODO: Input filtering
        setEventDetails({
            ...eventDetails,
            title: e.target.value
        })
    }

    function handleChangeDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault();
        // TODO: Input filtering
        setEventDetails({
            ...eventDetails,
            description: e.target.value
        })
    }

    function handleChangeLocation(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        // TODO: Input filtering
        setEventDetails({
            ...eventDetails,
            location: e.target.value
        })
    }
    
    function handleChangeStartTime(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        // TODO: Input filtering
        // TODO: Actual date parsing
        setEventDetails({
            ...eventDetails,
            startTime: new Date(e.target.value)
        })
    }

    function handleChangeEndTime(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        // TODO: Input filtering
        // TODO: Actual date parsing
        setEventDetails({
            ...eventDetails,
            endTime: new Date(e.target.value)
        })
    }

    function handleChangeDetails(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault();
        // TODO: Input filtering
        setEventDetails({
            ...eventDetails,
            details: e.target.value
        })
    }

    return (
        <div>
            {editable && editing ?
                <>
                    <form onSubmit={(handleSubmit)}>
                        <input type="text" name="title" value={eventDetails.title} onChange={handleChangeTitle} />
                        <textarea name="description" value={eventDetails.description} onChange={handleChangeDescription} />
                        <input type="text" name="location" value={eventDetails.location} onChange={handleChangeLocation} />
                        <input type="text" name="startTime" value={eventDetails.startTime.toLocaleTimeString()} onChange={handleChangeStartTime} />
                        <input type="text" name="endTime" value={eventDetails.endTime.toLocaleTimeString()} onChange={handleChangeEndTime} />
                        <textarea name="details" value={eventDetails.details} onChange={handleChangeDetails} />
                        <button onClick={handleClickCancel}>Cancel</button>
                        <button type="submit">Save</button>
                    </form>
                </>
            :
                <>
                    <h1>{event.title}</h1>
                    {editable && !editing &&
                        <button onClick={handleClickEdit}>Edit</button>
                    }

                    <p>{event.description}</p>
                    <p>Location: {event.location}</p>
                    <p>Time: {event.startTime.toLocaleTimeString()} - {event.endTime.toLocaleTimeString()}</p>
                    <p>{event.details}</p>
                </>
            }
        </div>
    )
}

export default EventDetails