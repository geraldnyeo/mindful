import api from "./HTTPService"

import type { User, Group } from "./UserService"

interface Event {
    id: string,
    title: string,
    description: string,
    location: string,
    startTime: Date,
    endTime: Date,
    details: string,
    contactIC: User,
    volunteers: Group[],
    participants: Group[]
}

interface EventShort {
    id: string,
    title: string,
    location: string,
    startTime: Date,
    endTime: Date
}

/**
 * Data Service
 * Handles loading of event details, etc.
 */
class DataService {
    /**
     * Get event calendar details by month
     * @param start: datestring in dd/mm/yyyy format
     * @param end: datestring in dd/mm/yyyy format
     */
    getEventsByMonthAdmin(start: string, end: string): EventShort[] {
        api.get(`/api/event`, {
            params: {
                "start": start,
                "end": end
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
            // TODO
        })

        return [
            {
                id: "asdsadsa",
                title: "Apple Picking",
                location: "Orchard Road",
                startTime: new Date("2026-01-17T17:53:38.683+00:00"),
                endTime: new Date("2026-01-17T17:53:39.683+00:00")
            }
        ]
    }

    /**
     * Get event details by eventid
     * @param eventid id of the event to get
     */
    getEventById(eventid: number): Event {
        api.get(`/api/event/details/${eventid}`)
        .then(res => {
            console.log(res);
            // TODO: Parse into Event
            
        })
        .catch(err => {
            console.log(err);
            // TODO: throw Error
        })

        return {
            id: "abc123",
            title: "Nature Walk",
            description: "desc",
            location: "Park E",
            startTime: new Date("2026-01-17T17:53:38.683+00:00"),
            endTime: new Date("2026-01-17T17:53:39.683+00:00"),
            details: "Meeting point: Park Garden, 1400",
            contactIC: {
                id: "abca1234",
                name: "Alice",
                email: "a@b.com",
                role: "admin",
                joinedDate: "14/12/2000"
            },
            volunteers: [{
                name: "Group 1",
                max_capacity: 10,
                users: [{
                    id: "defghijkl",
                    name: "Ben",
                    email: "b@c.com",
                    role: "volunteer",
                    joinedDate: "07/03/2024"
                }]
            }],
            participants: [{
                name: "Group 1",
                max_capacity: 5,
                users: [{
                    id: "uinlfsdfs",
                    name: "Carla",
                    email: "c@d.com",
                    role: "participant",
                    joinedDate: "15/07/2022"
                }]
            }]
        }
    }

    /**
     * Updates event details
     */
    putEvent(event: Event) {
        api.put("/api/event/update", event)
        .then(res => {
            console.log(res);
            // TODO: Return success
        })
        .catch(err => {
            console.log(err);
            // TODO: throw Error
        })
    }
}

export default new DataService()

export type {
    Event,
    EventShort
}