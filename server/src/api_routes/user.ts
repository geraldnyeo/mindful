import authService from "../services/authService.js";
import { userService, User } from "../services/userService.js";
import type { NextFunction, Request, Response } from "express";

async function me(req: Request, res: Response) {
    const id = await authService.getIdFromToken(req.cookies['session']);
    
    try {
        if(!id) {
            throw new Error("Session token has no sub?");
        }

        const userDoc = await userService.getUser(id);
        if(!userDoc) {
            throw new Error("Unable to get user details when signing in");
        }
        const user = User.fromDBJSON(userDoc);

        res.status(200); // ok
        res.send(user.toClientJSONBasic());
        return;
    } catch(e) {
        console.error(e);
        res.sendStatus(500) // ise
        return;
    }
}

export {
    me as userAPIMe
}