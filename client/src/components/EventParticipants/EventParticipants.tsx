import { useState } from "react"

import "./eventParticipants.css"

import AuthService from "../../services/AuthService"
import type { userRole, Group } from "../../services/UserService"
import type { EventSaveStatus } from "../../pages/EventPage/EventPage"

type EventParticipantsProps = {
    participants: Group[],
    role: userRole,
    saveCallback: (data: any) => Promise<EventSaveStatus>
}

function EventParticipants({ participants, role, saveCallback }: EventParticipantsProps) {
    const [selected, setSelected] = useState<number>(0);

    async function handleAddParticipantGroup(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        // TODO: Something to name the group, maybe a modal? idk
    }

    async function handleJoinGroup(e: React.MouseEvent<HTMLButtonElement>) {
            e.preventDefault();
            const user = AuthService.getUser();
            if (!user) {
                throw new Error("User is null!")
            }
            
            const updatedParticipants = structuredClone(participants);
            updatedParticipants[selected].users.push(user);
    
            saveCallback({ volunteers: updatedParticipants });
            // TODO: Refresh page
        }

    return (
        <div>
            <h2>Participants</h2>
            <div className="eventParticipantsHeader">
                {participants.map((group, index) => (
                    <button onClick={(_: React.MouseEvent<HTMLButtonElement>) => {setSelected(index)}}>{group.name}</button>
                ))}
                {role === "admin" &&
                    <button onClick={handleAddParticipantGroup}>+</button>
                }
            </div>
            <div className="eventParticipantGroup">
                <h3>{participants[selected].name}</h3>
                <p>Max: {participants[selected].max_capacity}</p>
                {role === "admin" &&
                    <ul>
                        {participants[selected].users.map((user) => (
                            <li>{user.name}</li>
                        ))}
                    </ul>
                }
                {role === "participant" &&
                    <button onClick={handleJoinGroup}>Join Group</button>
                }
            </div>
        </div>
    )
}

export default EventParticipants