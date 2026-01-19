import { useState, useEffect } from "react"

import "./eventView.css"

import AuthService from "../../services/AuthService"
import DataService from "../../services/DataService"
import type { Event } from "../../services/DataService"
import type { userRole, Group, User } from "../../services/UserService"

type EventViewProps = {
    role: userRole,
    event: Event
}

function EventView({ role, event }: EventViewProps) {
    const [eventData, setEventData] = useState<Event>(event);
    const [editing, setEditing] = useState<boolean>(false);
    const [selectedVolunteerGroup, setSelectedVolunteerGroup] = useState<number>(0);
    const [selectedParticipantGroup, setSelectedParticipantGroup] = useState<number>(0);

    function handleClickEdit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (role === "admin") {
            setEditing(true)
        }
    }

    function handleClickCancel(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setEditing(false);
    }

    async function handleClickSave(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        await DataService.putEvent(eventData);
        // TODO: Refresh page
    }

    function handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        // TODO: Input filtering
        setEventData({
            ...eventData,
            title: e.target.value
        })
    }

    function handleChangeDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault();
        // TODO: Input filtering
        setEventData({
            ...eventData,
            description: e.target.value
        })
    }

    function handleChangeLocation(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        // TODO: Input filtering
        setEventData({
            ...eventData,
            location: e.target.value
        })
    }
    
    function handleChangeStartTime(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        // TODO: Input filtering
        // TODO: Actual date parsing
        setEventData({
            ...eventData,
            startTime: new Date(e.target.value)
        })
    }

    function handleChangeEndTime(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        console.log(e.target.value);
        // TODO: Input filtering
        // TODO: Actual date parsing
        setEventData({
            ...eventData,
            endTime: new Date(e.target.value)
        })
    }

    function handleChangeDetails(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault();
        // TODO: Input filtering
        setEventData({
            ...eventData,
            details: e.target.value
        })
    }

    async function handleAddVolunteerGroup(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        // TODO: Something to name the group, maybe a modal? idk
    }

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
        
        // TODO: Try catch
        await DataService.register(role, event.id, event.volunteers[selectedVolunteerGroup].name);
        
        // TODO: Refresh page
    }

    return (
        <div>
            {/* Details */}
            {role === "admin" && editing ?
                <>
                    <input type="text" name="title" value={eventData.title} onChange={handleChangeTitle} />
                    <textarea name="description" value={eventData.description} onChange={handleChangeDescription} />
                    <input type="text" name="location" value={eventData.location} onChange={handleChangeLocation} />
                    <input type="time" name="startTime" value={eventData.startTime.toLocaleTimeString()} onChange={handleChangeStartTime} />
                    <input type="time" name="endTime" value={eventData.endTime.toLocaleTimeString()} onChange={handleChangeEndTime} />
                    <textarea name="details" value={eventData.details} onChange={handleChangeDetails} />
                </>
            :
                <>
                    <div>
                        <h1>{event.title}</h1>
                        {role === "admin" && !editing &&
                            <button onClick={handleClickEdit}>Edit</button>
                        }
                    </div>
                    <p>{event.description}</p>
                    <p>Location: {event.location}</p>
                    <p>Time: {event.startTime.toLocaleTimeString()} - {event.endTime.toLocaleTimeString()}</p>
                    <p>{event.details}</p>
                </>
            }

            {/* Admin */}
            {role === "admin" && editing ?
                <div>
                    {/* I don't want to do this right now.*/}
                </div>
            :
                <div>
                    <p>Contact IC: {event.contactIC.name}</p>
                    <p>Contact IC email: {event.contactIC.email}</p>
                </div>
            }

            {/* Volunteers */}
            {(role === "admin" || role === "volunteer") &&
                <div>
                    <h2>Volunteers</h2>
                    <div className="eventVolunteersHeader">
                        {event.volunteers.map((group, i) => (
                            <button key={i} onClick={(_: React.MouseEvent<HTMLButtonElement>) => setSelectedVolunteerGroup(i)}>{group.name}</button>
                        ))}
                        {role === "admin" &&
                            <button onClick={handleAddVolunteerGroup}>+</button>
                        }
                    </div>
                    <div className="eventVolunteersGroup">
                        <h3>{event.volunteers[selectedVolunteerGroup].name}</h3>
                        <p>Max Volunteers: {event.volunteers[selectedVolunteerGroup].max_capacity}</p>
                        <ul>
                            {event.volunteers[selectedVolunteerGroup].users.map(user => (
                                <li>{user.name}</li>
                            ))}
                        </ul>
                        {role === "volunteer" &&
                            <button onClick={handleJoinGroup}>Join Group</button>
                        }
                    </div>
                </div>
            }

            {/* Participants */}
            {(role === "admin" || role === "participant") &&
                <div>
                    <h2>Participants</h2>
                    <div className="eventParticipantsHeader">
                        {event.participants.map((group, i) => (
                            <button key={i} onClick={(_: React.MouseEvent<HTMLButtonElement>) => {setSelectedParticipantGroup(i)}}>{group.name}</button>
                        ))}
                        {role === "admin" &&
                            <button onClick={handleAddParticipantGroup}>+</button>
                        }
                    </div>
                    <div className="eventParticipantGroup">
                        <h3>{event.participants[selectedParticipantGroup].name}</h3>
                        <p>Max: {event.participants[selectedParticipantGroup].max_capacity}</p>
                        {role === "admin" &&
                            <ul>
                                {event.participants[selectedParticipantGroup].users.map((user) => (
                                    <li>{user.name}</li>
                                ))}
                            </ul>
                        }
                        {role === "participant" &&
                            <button onClick={handleJoinGroup}>Join Group</button>
                        }
                    </div>
                </div>
            }

            {/* Save Controls */}
            {role === "admin" && editing &&
                <>
                    <button onClick={handleClickCancel}>Cancel</button>
                    <button onClick={handleClickSave}>Save</button>
                </>
            }
        </div>
    )
}

export default EventView;