const { ObjectId } = require("mongodb");
const { dbClient } = require("../lib/dbClient");

class ActivityDetails {
    wheelchair: boolean;
    payment: boolean;
    meeting: string | null;
    additional: Record<string, string>[];

    constructor(wheelchair = false, payment = false, additional: Record<string, string>[] = [], meeting: string | null = null) {
        this.wheelchair = wheelchair;
        this.payment = payment;
        this.additional = additional;
        this.meeting = meeting;
    }
}

class Activity {
    title: string;
    time: {
        start: Date;
        end: Date;
    };
    description?: string;
    location?: string;
    details?: ActivityDetails;


    // Title and date/time are the main details that are always
    // present for any activity so we only put them in constructor
    constructor(title: string, startTime: Date, endTime: Date) {
        this.validateTime(startTime, endTime);

        this.title = title;
        this.time = {
            start: startTime,
            end: endTime
        };
    }

    setTitle(title: string) {
        if(typeof(title) != 'string') {
            throw new Error("Title must be a string");
        }

        this.title = title;
    }

    setDetails(details: ActivityDetails) {
        if(!(details instanceof ActivityDetails)) {
            throw new Error("Details for activity must be of correct type");
        }

        this.details = details;
        return this;
    }

    setLocation(location: string) {
        if(typeof(location) != 'string') {
            throw new Error("Location for activity must be a string");
        }

        this.location = location;
        return this;
    }

    setTime(start: Date, end: Date) {
        this.validateTime(start, end);

        this.time = {
            start: start,
            end: end
        };
        return this;
    }

    setDescription(description: string) {
        if(typeof(description) != 'string') {
            throw new Error("Activity description must be a string");
        }

        this.description = description;
        return this;
    }

    validateTime(start: Date, end: Date) {
        if(!(start instanceof Date) && !(end instanceof Date)) {
            throw new Error("Start or end time is not a date");
        }
        
        if(start > end) {
            throw new Error("Activity start time cannot be after end time");
        }
    }

    toDBJSON() {
        return {
            title: this.title,
            location: this.location,
            description: this.description,
            time: this.time,
            details: this.details
        }
    }
}

class ActivityService {
    async createActivity(activity: Activity) {
        if(!(activity instanceof Activity)) {
            throw new Error("Activity object is not of correct type");
        }
        let activities = dbClient.collection("activities");
        await activities.insertOne(activity.toDBJSON());
        console.log("Created activity");
    }

    async deleteActivity(id: string) {
        let activities = dbClient.collection("activities");
        let res = await activities.findOneAndDelete({_id: new ObjectId(id)});
        if(!res) {
            throw new Error("Failed to delete activity or activity does not exist");
        }
        console.log("Deleted activity");
    }
}

const activityService = new ActivityService();

export {ActivityDetails, Activity, activityService};