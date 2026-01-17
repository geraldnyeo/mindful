import { useState } from "react"

import "./eventVolunteers.css"

import type { userRole, Group } from "../../services/UserService"
import type { EventSaveStatus } from "../../pages/EventPage/EventPage"

type EventVolunteersProps = {
    volunteers: Group[],
    role: userRole,
    saveCallback: (data: any) => Promise<EventSaveStatus>
}

function EventVolunteers({ volunteers, role, saveCallback }: EventVolunteersProps) {
    const [selected, setSelected] = useState<number>(0);

    async function handleAddVolunteerGroup(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        // TODO
    }

    async function handleJoinGroup(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        // TODO
    }
    
    return (
        <div>
            <div className="eventVolunteersHeader">
                {volunteers.map((group, index) => (
                    <button onClick={(_: React.MouseEvent<HTMLButtonElement>) => setSelected(index)}>{group.name}</button>
                ))}
                {role === "admin" &&
                    <button onClick={handleAddVolunteerGroup}>+</button>
                }
            </div>
            <div className="eventVolunteersGroups">
                <div>
                    <h3>{volunteers[selected].name}</h3>
                    <p>{volunteers[selected].max_capacity}</p>
                    <ul>
                        {volunteers[selected].users.map(user => (
                            <li>{user.name}</li>
                        ))}
                    </ul>
                    {role === "volunteer" &&
                        <button onClick={handleJoinGroup}>Join Group</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default EventVolunteers