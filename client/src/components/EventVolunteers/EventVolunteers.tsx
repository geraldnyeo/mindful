import { useState } from "react"

import "./eventVolunteers.css"

import AuthService from "../../services/AuthService"
import type { userRole, Group } from "../../services/UserService"
import type { EventSaveStatus } from "../../pages/EventPage/EventPage"

type EventVolunteersProps = {
    volunteers: Group[],
    role: userRole,
	saveCallback: (data: any) => Promise<EventSaveStatus>,
    registerCallback: (data: any) => Promise<EventSaveStatus>
}

function EventVolunteers({ volunteers, role, saveCallback, registerCallback }: EventVolunteersProps) {
    const [selected, setSelected] = useState<number>(0);

    async function handleAddVolunteerGroup(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        // TODO: Something to name the group, maybe a modal? idk
    }

    async function handleJoinGroup(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const user = AuthService.getUser();
        if (!user) {
            throw new Error("User is null!")
        }

        registerCallback(volunteers[selected].name);
        // TODO: Refresh page
    }
    
    return (
        <div>
            <h2>Volunteers</h2>
            <div className="eventVolunteersHeader">
                {volunteers.map((group, index) => (
                    <button onClick={(_: React.MouseEvent<HTMLButtonElement>) => setSelected(index)}>{group.name}</button>
                ))}
                {role === "admin" &&
                    <button onClick={handleAddVolunteerGroup}>+</button>
                }
            </div>
            <div className="eventVolunteersGroup">
                <h3>{volunteers[selected].name}</h3>
                <p>Max: {volunteers[selected].max_capacity}</p>
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
    )
}

export default EventVolunteers