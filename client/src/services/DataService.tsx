import api from "./HTTPService"

import type { userRole, User, Group } from "./UserService"

interface EventDetails {
    wheelchair: boolean,
    payment: boolean,
    meeting: string | null,
    additional: Record<string, string>[];
}

interface Event {
    id: string,
    title: string,
    description: string,
    location: string,
    startTime: Date,
    endTime: Date,
    details: EventDetails,
    contactIC: User | null,
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
    getEventsByMonthAdmin(start: string, end: string): Promise<Event[]> {
        return api.get(`/api/event`, {
            params: {
                "start": start,
                "end": end
            }
        })
        .then(res => {
            console.log(res);
            const events: Event[] = res.data;
            return events;
        })
        .catch(err => {
            console.log(err);
            throw new Error(err.message);
        })

        // return [
        //     {
        //         id: "asdsadsa",
        //         title: "Apple Picking",
        //         description: "I like apples",
        //         location: "Orchard Road",
        //         startTime: new Date("2026-01-17T17:53:38.683+00:00"),
        //         endTime: new Date("2026-01-17T17:53:39.683+00:00"),
        //         details: {
        //             wheelchair: true,
        //             payment: true,
        //             meeting: "Meeting point: Park Garden, 1400",
        //             additional: [],
        //         },
        //         contactIC: {
        //             id: "abca1234",
        //             name: "Alice",
        //             email: "a@b.com",
        //             role: "admin",
        //             joinedDate: "14/12/2000"
        //         },
        //         volunteers: [{
        //             name: "Group 1",
        //             max_capacity: 10,
        //             users: [{
        //                 id: "defghijkl",
        //                 name: "Ben",
        //                 email: "b@c.com",
        //                 role: "volunteer",
        //                 joinedDate: "07/03/2024"
        //             }]
        //         }],
        //         participants: [{
        //             name: "Group 1",
        //             max_capacity: 5,
        //             users: [{
        //                 id: "uinlfsdfs",
        //                 name: "Carla",
        //                 email: "c@d.com",
        //                 role: "participant",
        //                 joinedDate: "15/07/2022"
        //             }]
        //         }]
        //     }
        // ]
    }

    /**
     * Get event details by eventid
     * @param eventid id of the event to get
     */
    getEventById(eventid: string): Promise<Event> {
        return api.get(`/api/event/details/${eventid}`)
            .then(res => {
                const eventData: Event = res.data;
                eventData.startTime = new Date(eventData.startTime);
                eventData.endTime = new Date(eventData.endTime);
                return eventData;
            })
            .catch(err => {
                console.log(err);
                throw new Error(err.message);
            })
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

	/**
	 * Register a volunteer for an event
	 */
	register(userRole: userRole, eventid: string, group: string) {
		api.post(`/api/event/register/${userRole}`, {
			event: eventid,
			group
		})
		.then(res => {
			console.log(res);
			// TODO
		})
		.catch(err => {
			console.log(err);
			// TODO;
		})
	}
}

export default new DataService()

export type {
    Event,
    EventShort
}