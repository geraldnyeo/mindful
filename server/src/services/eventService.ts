import { ObjectId, type Document, type WithId } from "mongodb";
import dbClient from "../lib/dbClient.js";

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

class ActivityUserGroup {
    name: string;
    max_capacity: number;
    users: string[];

    constructor(name: string, max_capacity: number, users: string[] = []) {
        this.name = name;
        this.max_capacity = max_capacity;
        this.users = users;
    }

    addUser(id: string) {
        if(this.users.length + 1 < this.max_capacity) {
            this.users.push(id);
            return true;
        }
        
        return false;
    }

    addUsers(ids: string[]) {
        if(this.users.length + ids.length < this.max_capacity) {
            this.users = this.users.concat(ids);
            return true;
        }

        return false;
    }

    setUsers(ids: string[]) {
        if(ids.length < this.max_capacity) {
            this.users = ids;
            return true;
        }

        return false;
    }

    removeUser(id: string) {
        const index = this.users.indexOf(id);
        if(index > -1) {
            this.users.splice(index, 1);
            return true;
        }

        return false;
    }
}

type ActivityDefaultOptions = {
    id?: string | null;
    details?: ActivityDetails;
    contactIC?: string | null;
    volunteerGroups?: ActivityUserGroup[];
    participantGroups?: ActivityUserGroup[];
}

class Activity {
    id: string | null;
    title: string;
    time: {
        start: Date;
        end: Date;
    };
    location: string;
    description: string;
    details: ActivityDetails;
    contactIC: string | null;
    volunteers: ActivityUserGroup[];
    participants: ActivityUserGroup[];

    static fromDBJSON(document: WithId<Document>) {
        let newActivity = new Activity(document.title,
                                       document.location,
                                       document.time.start,
                                       document.time.end,
                                       document.description,
                                       {id: document._id.toString(),
                                        contactIC: document.contactIC,
                                        details: new ActivityDetails(document.details.wheelchair,
                                                                     document.details.payment,
                                                                     document.details.additional,
                                                                     document.details.meeting),     
                                        volunteerGroups: [],
                                        participantGroups: []                                                          
                                       });
        console.log(newActivity);
        for(const volunteerGroup of document.volunteers) {
            let toAdd = new ActivityUserGroup(volunteerGroup.name, volunteerGroup.max_capacity);
            toAdd.addUsers(volunteerGroup.users);
            newActivity.addNewVolunteerGroup(toAdd);
        }

        for(const participantGroup of document.participants) {
            let toAdd = new ActivityUserGroup(participantGroup.name, participantGroup.max_capacity);
            toAdd.addUsers(participantGroup.users);
            newActivity.addNewParticipantsGroup(toAdd);
        }
                                       
        return newActivity;
    }

    // Title and date/time are the main details that are always
    // present for any activity so we only put them in constructor
    constructor(title: string, 
                location: string, 
                startTime: Date, 
                endTime: Date,
                description: string,
                options: ActivityDefaultOptions = {id: null}) {
        this.validateTime(startTime, endTime);

        this.title = title;
        this.location = location;
        this.time = {
            start: startTime,
            end: endTime
        };
        this.description = description;
        if(options.id) {
            this.id = options.id;
        } else {
            this.id = null;
        }
        if(options.details) {
            this.details = options.details;
        } else {
            this.details = new ActivityDetails();
        }

        if(options.contactIC) {
            this.contactIC = options.contactIC;
        } else {
            this.contactIC = null;
        }

        if(options.volunteerGroups) {
            this.volunteers = options.volunteerGroups;
        } else {
            this.volunteers = [new ActivityUserGroup("1", 10)];
        }
        
        if(options.participantGroups) {
            this.participants = options.participantGroups;
        } else {
            this.participants = [new ActivityUserGroup("1", 10)];
        }
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

    addNewVolunteerGroup(group: ActivityUserGroup) {
        if(this.volunteers.filter(grp => grp.name == group.name).length != 0) {
            console.log(this.volunteers.filter(grp => grp.name == group.name));
            throw new Error("Can't have 2 groups with the same name");
        }

        this.volunteers.push(group);
    }

    addNewParticipantsGroup(group: ActivityUserGroup) {
        if(this.participants.filter(grp => grp.name == group.name).length != 0) {
            throw new Error("Can't have 2 groups with the same name");
        }

        this.participants.push(group);
    }

    setVolunteerGroups(groups: ActivityUserGroup[]) {
        this.volunteers = groups;
    }

    setParticipantsGroups(groups: ActivityUserGroup[]) {
        this.participants = groups;
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
            time: this.time,
            description: this.description,
            details: this.details,
            contactIC: this.contactIC,
            volunteers: this.volunteers,
            participants: this.participants
        }
    }

    toClientJSONFull() {
        return {
            id: this.id,
            title: this.title,
            location: this.location,
            startTime: this.time.start,
            endTime: this.time.end,
            description: this.description,
            details: this.details,
            contactIC: this.contactIC,
            volunteers: this.volunteers,
            participants: this.participants
        }
    }
}

class ActivityService {
    async createActivity(activity: Activity) {
        if(!(activity instanceof Activity)) {
            throw new Error("Activity object is not of correct type");
        }
        let activities = dbClient.collection("activities");
        let res = await activities.insertOne(activity.toDBJSON());
        console.log("Created activity");
        return res;
    }

    async deleteActivity(id: string) {
        let activities = dbClient.collection("activities");
        let res = await activities.findOneAndDelete({_id: new ObjectId(id)});
        if(!res) {
            throw new Error("Failed to delete activity or activity does not exist");
        }
        console.log("Deleted activity");
    }

    async getActivity(id: string) {
        let activities = dbClient.collection("activities");
        let res = await activities.findOne({_id: new ObjectId(id)});
        if(!res) {
            throw new Error("Failed to get activity or activity does not exist");
        }
        return Activity.fromDBJSON(res);
    }

    async setActivity(id: string, activity: Activity) {
        let activities = dbClient.collection("activities");
        await activities.replaceOne({_id: new ObjectId(id)}, activity.toDBJSON()); 
    }

    async addUser(eventId: string, userId: string, group: string, groupType: "volunteer" | "participant") {
        let activities = dbClient.collection("activities");
        let queryDoc = {
            _id: new ObjectId(eventId),
            [groupType + 's']: {
                $elemMatch: {
                    name: group
                }
            }
        }
        let activity = await activities.findOne(queryDoc);
        console.log(await activities.findOne(queryDoc));
        console.log(
            // @ts-ignore
        await activities.updateMany(queryDoc, {$push: {
            [`${groupType + 's'}.$.users`]: userId }})
        );
    }

    async removeUser(eventId: string, userId: string, group: string, groupType: "volunteer" | "participant") {
        let activities = dbClient.collection("activities");
        let queryDoc = {
            _id: new ObjectId(eventId),
            [groupType + 's']: {
                $elemMatch: {
                    name: group
                }
            }
        }
        let activity = await activities.findOne(queryDoc);
        console.log(await activities.findOne(queryDoc));
        console.log(
            // @ts-ignore
        await activities.updateMany(queryDoc, {$pull: {
            [`${groupType + 's'}.$.users`]: userId }})
        );
    }
}

const activityService = new ActivityService();

export {ActivityDetails, Activity, ActivityUserGroup, activityService};