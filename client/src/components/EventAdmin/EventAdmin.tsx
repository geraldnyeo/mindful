import { useState } from "react"

import "./eventAdmin.css"

import type { User } from "../../services/UserService"
import type { EventSaveStatus } from "../../pages/EventPage/EventPage"

type EventAdminFields = {
    contactIC: User
    // TODO: Rest of the admin in a list maybe
}

type EventAdminProps = {
    event: EventAdminFields,
    editable: boolean,
    saveCallback: (data: any) => Promise<EventSaveStatus>
}

function EventAdmin({ event, editable, saveCallback }: EventAdminProps) {
    const [eventAdmin, setEventAdmin] = useState<EventAdminFields>(event);
    const [editing, setEditing] = useState<boolean>(false);

    function handleClickEdit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setEditing(true);
    }

    return (
        <>
            {editable && editing ?
                <div>
                    {/* I don't want to do this right now.*/}
                </div>
            :
                <div>
                    <p>Contact IC: {event.contactIC.name}</p>
                    <p>Contact IC email: {event.contactIC.email}</p>
                    {editable && !editing &&
                        <button onClick={handleClickEdit}>Edit</button>
                    }
                </div>
            }
        </>
    )
}

export default EventAdmin