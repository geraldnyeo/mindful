import { group } from "node:console";
import authService from "../services/authService.js";
import { Activity, activityService, ActivityUserGroup } from "../services/eventService.js";
import { userService, User } from "../services/userService.js";
import type { NextFunction, Request, Response } from "express";
import * as z from 'zod';

const detailInput = z.object({
    wheelchair: z.boolean(),
    payment: z.boolean(),
    meeting: z.nullable(z.string()),
    additional: z.array(z.record(z.string(), z.string()))
});

const groupInput = z.object({
    name:  z.string(),
    max_capacity: z.int().gt(0),
    users: z.array(z.string())
});

const createInput = z.object({
    title: z.string(),
    location: z.string(),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    description: z.string(),
    details: z.nullable(detailInput)
});

async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const parsedInput = createInput.parse(req.body);
        let activity = new Activity(parsedInput.title, 
                                    parsedInput.location, 
                                    parsedInput.startTime,
                                    parsedInput.endTime,
                                    parsedInput.description,
                                    );
        if(parsedInput.details) {
            activity.setDetails(parsedInput.details);
        }
        let createdActivityDoc = await activityService.createActivity(activity);
        res.status(200); // ok
        res.send(createdActivityDoc.insertedId.toString());
        return;
    } catch(e) {
        console.error(e);
        if(e instanceof z.ZodError) {
            res.sendStatus(400); // bad req
            return;
        }

        res.sendStatus(500); // ise
        return;
    }
}

async function details(req: Request, res: Response, next: NextFunction) {
    const eventId = req.params.id;
    if(!eventId || typeof(eventId) != 'string') {
        res.sendStatus(400); // bad req
        return;
    }

    try {
        const event = await activityService.getActivity(eventId);

        res.status(200); // ok
        res.send(await event.toClientJSONFullUsers());
        return;
    } catch(e) {
        console.error(e);
        res.sendStatus(500); // ise
        return;
    }
}

const updateInput = z.object({
	id: z.string(),
	title: z.string(),
	location: z.string(),
	startTime: z.coerce.date(),
	endTime: z.coerce.date(),
	description: z.string(),
	details: detailInput,
	contactIC: z.nullable(z.string()),
	volunteers: z.array(groupInput),
	participants: z.array(groupInput)
});

async function update(req: Request, res: Response, next: NextFunction) {
    console.log("updating");
    const parsedInput = updateInput.safeParse(req.body);
    if(parsedInput.error) {
        console.error(parsedInput.error);
        res.sendStatus(400); // bad req
        return;
    }

    const parsedInputData = parsedInput.data;
    const activity = new Activity(parsedInputData.title, 
                                  parsedInputData.location,
                                  parsedInputData.startTime,
                                  parsedInputData.endTime,
                                  parsedInputData.description,
                                  {
                                    contactIC: parsedInputData.contactIC,
                                    details: parsedInputData.details,
                                    id: parsedInputData.id,
                                    participantGroups: parsedInputData.participants.map(group => new ActivityUserGroup(group.name, group.max_capacity, group.users)),
                                    volunteerGroups: parsedInputData.volunteers.map(group => new ActivityUserGroup(group.name, group.max_capacity, group.users))
                                  }
    );

    console.log(activity);

    try {
        await activityService.setActivity(parsedInputData.id, activity);
        res.sendStatus(200);
        return;
    } catch(e) {
        console.error(e);
        res.sendStatus(500);
        return;
    }
}

async function del(req: Request, res: Response, next: NextFunction) {
    const eventId = req.params.id;
    if(!eventId || typeof(eventId) != 'string') {
        res.sendStatus(400); // bad req
        return;
    }

    try {
        await activityService.deleteActivity(eventId);
        res.sendStatus(200); // ok
        return;
    } catch(e) {
        console.error(e);
        res.sendStatus(500); // ise
        return;
    }

} 

const registerInput = z.object({
    event: z.string(),
    group: z.string()
});

async function register(req: Request, res: Response, next: NextFunction) {
    const parsedInput = registerInput.safeParse(req.body);
    if(parsedInput.error) {
        console.error(parsedInput.error);
        res.sendStatus(400); // bad req
        return;
    }

    const groupType = req.params.groupType;
    if(!groupType || !(groupType == "volunteer" || groupType == "participant")) {
        res.sendStatus(400); // bad req
        return;
    }

    try {
        let jwt = await authService.checkSessionToken(req.cookies['session']);
        if(!jwt || !jwt.payload.sub) {
            console.log("no jwt");
            throw new Error("unauth");
        }
        const parsedInputData = parsedInput.data;
        await activityService.addUser(parsedInputData.event, jwt.payload.sub, parsedInputData.group, groupType);
        res.sendStatus(200); // ok
        return;
    } catch(e) {
        console.error(e);
        res.sendStatus(500); // ise
        return;
    }
}

async function cancel(req: Request, res: Response, next: NextFunction) {
    const parsedInput = registerInput.safeParse(req.body);
    if(parsedInput.error) {
        console.error(parsedInput.error);
        res.sendStatus(400); // bad req
        return;
    }

    const groupType = req.params.groupType;
    if(!groupType || !(groupType == "volunteer" || groupType == "participant")) {
        res.sendStatus(400); // bad req
        return;
    }

    try {
        let jwt = await authService.checkSessionToken(req.cookies['session']);
        if(!jwt || !jwt.payload.sub) {
            console.log("no jwt");
            throw new Error("unauth");
        }
        const parsedInputData = parsedInput.data;
        await activityService.removeUser(parsedInputData.event, jwt.payload.sub, parsedInputData.group, groupType);
        res.sendStatus(200); // ok
        return;
    } catch(e) {
        console.error(e);
        res.sendStatus(500); // ise
        return;
    }
}

export {
    create as eventAPICreate,
    details as eventAPIDetails,
    update as eventAPIUpdate,
    del as eventAPIDelete,
    register as eventAPIRegister,
    cancel as eventAPICancel
}