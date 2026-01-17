import api from "./HTTPService"

import type { User } from "./UserService"

interface Event {
    id: string,
    title: string,
    location: string,
    startTime: string,
    endTime: string,
    details: string,
    contactIC: User,
    volunteers: User[],
    participants: User[]
}

/**
 * Data Service
 * Handles loading of event details, etc.
 */
class DataService {
    /**
     * Get event calendar details by month
     * @param month 
     */
    getEventsByMonthAdmin(month: any) {
	
    }

    /**
     * Get event details by eventid
     * @param eventid id of the event to get
     */
    getEventById(eventid: number): Event {
        api.get("/api/event/details", {
            params: { eventid }
        })
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
            location: "Park E",
            startTime: "1430",
            endTime: "1630",
            details: "Meeting point: Park Garden, 1400",
            contactIC: {
                id: "abca1234",
                name: "Alice",
                email: "a@b.com",
                role: "admin",
                joinedDate: "14/12/2000"
            },
            volunteers: [],
            participants: []
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
    Event
}