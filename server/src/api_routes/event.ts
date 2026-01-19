import authService from "../services/authService.js";
import { Activity, activityService } from "../services/eventService.js";
import { userService, User } from "../services/userService.js";
import type { NextFunction, Request, Response } from "express";
import * as z from 'zod';

const detailInput = z.object({
    wheelchair: z.boolean(),
    payment: z.boolean(),
    meeting: z.string(),
    additional: z.array(z.record(z.string(), z.string()))
});

// {
// 	title: string,
// 	location: string,
// 	startTime: Date,
// 	endTime: Date,
// 	description: string,
// 	details: Details | null
// }

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
        res.send(event.toClientJSONFull());
        return;
    } catch(e) {
        console.error(e);
        res.sendStatus(500); // ise
        return;
    }
}

export {
    create as eventAPICreate,
    details as eventAPIDetails
}