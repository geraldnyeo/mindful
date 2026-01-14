const { ObjectId } = require("mongodb");
const { dbClient } = require("../lib/dbClient");

class ActivityDetails {
    constructor(wheelchair = false, payment = false, additional = [], meeting = null) {
        this.wheelchair = wheelchair;
        this.payment = payment;
        this.additional = additional;
        this.meeting = meeting;
    }
}

class Activity {
    // Title and date/time are the main details that are always
    // present for any activity so we only put them in constructor
    constructor(title, startTime, endTime) {
        this.validateTime(startTime, endTime);

        this.title = title;
        this.time = {
            start: startTime,
            end: endTime
        };
    }

    setTitle(title) {
        if(typeof(title) != 'string') {
            throw new Error("Title must be a string");
        }

        this.title = title;
    }

    setDetails(details) {
        if(!(details instanceof ActivityDetails)) {
            throw new Error("Details for activity must be of correct type");
        }

        this.details = details;
        return this;
    }

    setLocation(location) {
        if(typeof(details) != 'string') {
            throw new Error("Location for activity must be a string");
        }

        this.location = location;
        return this;
    }

    setTime(start, end) {
        this.validateTime(start, end);

        this.time = {
            start: start,
            end: end
        };
        return this;
    }

    setDescription(description) {
        if(typeof(description) != 'string') {
            throw new Error("Activity description must be a string");
        }

        this.description = description;
        return this;
    }

    validateTime(start, end) {
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
    async createActivity(activity) {
        if(!(activity instanceof Activity)) {
            throw new Error("Activity object is not of correct type");
        }
        let activities = dbClient.collection("activities");
        await activities.insertOne(activity.toDBJSON());
        console.log("Created activity");
    }

    async deleteActivity(id) {
        let activities = dbClient.collection("activities");
        let res = await activities.findOneAndDelete({_id: new ObjectId(id)});
        if(!res) {
            throw new Error("Failed to delete activity or activity does not exist");
        }
        console.log("Deleted activity");
    }
}

const activityService = new ActivityService();

module.exports = {
    ActivityDetails,
    Activity,
    activityService
}