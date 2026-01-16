import api from "./HTTPService"

interface Event {
    date: string
    name: string
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
}

export default new DataService()

export type {
    Event
}