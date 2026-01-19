import { useState } from "react"
import { useNavigate } from "react-router"

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
    const navigate = useNavigate();

    const user = AuthService.getUser();

    const [eventData, setEventData] = useState<Event>(event);
    const [editing, setEditing] = useState<boolean>(false);
    const [selectedVolunteerGroup, setSelectedVolunteerGroup] = useState<number>(0);
    const [selectedParticipantGroup, setSelectedParticipantGroup] = useState<number>(0);

    const formatDatetimeLocal = (dateObject: Date) => {
        const offset = dateObject.getTimezoneOffset() * 60000; // Offset in milliseconds
        const localDate = new Date(dateObject.getTime() - offset);
        return localDate.toISOString().slice(0, 16); 
    };

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
        setEditing(false);
        navigate(0);
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
        // TODO: Input filtering
        // TODO: Actual date parsing
        setEventData({
            ...eventData,
            endTime: new Date(e.target.value)
        })
    }

    function handleChangeDetailsWheelchair(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        // TODO: Input filtering
        setEventData({
            ...eventData,
            details: {
                ...eventData.details,
                wheelchair: e.target.checked
            }
        })
    }

    function handleChangeDetailsPayment(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        // TODO: Input filtering
        setEventData({
            ...eventData,
            details: {
                ...eventData.details,
                payment: e.target.checked
            }
        })
    }

    function handleChangeDetailsMeeting(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        // TODO: Input filtering
        setEventData({
            ...eventData,
            details: {
                ...eventData.details,
                meeting: e.target.value
            }
        })
    }

    function handleChangeDetailsAdditional(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault();
        // TODO: Input filtering
        setEventData({
            ...eventData,
            // TODO: I don't want to do this right now
        })
    }

    function checkVolunteerInGroup() {
        console.log(eventData.volunteers[selectedVolunteerGroup].users.filter(u => u.id === user?.id));
        return eventData.volunteers[selectedVolunteerGroup].users.filter(u => u.id === user?.id).length > 0;
    }

    async function handleAddVolunteerGroup(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        // TODO: Something to name the group, maybe a modal? idk
    }

    function checkParticipantInGroup() {
        return eventData.participants[selectedParticipantGroup].users.filter(u => u.id === user?.id).length > 0;
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
        
        navigate(0);
    }

    async function handleLeaveGroup(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const user = AuthService.getUser();
        if (!user) {
            throw new Error("User is null!")
        }
        
        // TODO: Try catch
        await DataService.cancel(role, event.id, event.volunteers[selectedVolunteerGroup].name);
        
        navigate(0);
    }

    return (
        <div>
            {/* Details */}
            {role === "admin" && editing ?
                <>
                    <input type="text" name="title" value={eventData.title} onChange={handleChangeTitle} />
                    <textarea name="description" value={eventData.description} onChange={handleChangeDescription} />
                    <input type="text" name="location" value={eventData.location} onChange={handleChangeLocation} />
                    <input type="datetime-local" name="startTime" value={formatDatetimeLocal(eventData.startTime)} onChange={handleChangeStartTime} />
                    <input type="datetime-local" name="endTime" value={formatDatetimeLocal(eventData.endTime)} onChange={handleChangeEndTime} />
                    <input type="checkbox" name="wheelchair" checked={eventData.details.wheelchair} onChange={handleChangeDetailsWheelchair} />
                    <input type="checkbox" name="payment" checked={eventData.details.payment} onChange={handleChangeDetailsPayment} />
                    <input type="text" name="meeting" value={eventData.details.meeting ?? ""} onChange={handleChangeDetailsMeeting} />
                    {/* TODO: Additional details */}
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
                    <p>{event.details.meeting}</p>
                </>
            }

            {/* Admin */}
            {role === "admin" && editing ?
                <div>
                    {/* I don't want to do this right now.*/}
                </div>
            :
                <>
                    {event.contactIC &&
                        <div>
                            <p>Contact IC: {event.contactIC.name}</p>
                            <p>Contact IC email: {event.contactIC.email}</p>
                        </div>
                    }
                </>
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
                        {role === "volunteer" && !checkVolunteerInGroup() &&
                            <button onClick={handleJoinGroup}>Join Group</button>
                        }
                        {role === "volunteer" && checkVolunteerInGroup() &&
                            <button onClick={handleLeaveGroup}>Leave Group</button>
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
                        {role === "participant" && !checkParticipantInGroup() &&
                            <button onClick={handleJoinGroup}>Join Group</button>
                        }
                        {role === "participant" && checkParticipantInGroup() &&
                            <button onClick={handleLeaveGroup}>Leave Group</button>
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

export default EventView