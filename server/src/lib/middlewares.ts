import type { Request, Response, NextFunction } from "express";
import authService from "../services/authService.js";
import { userService } from "../services/userService.js";

async function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    if(!req.cookies['session']) {
        res.sendStatus(400); // bad req
    }

    try {
        if(await authService.checkSessionToken(req.cookies['session'])) {
            next();
        }
    } catch(e) {
        res.sendStatus(401); // unauth
        return;
    }
}

async function needsJSON(req: Request, res: Response, next: NextFunction) {
    if(!req.is('application/json')) {
        res.sendStatus(415); // unsupported media type
        return;
    }
    
    next();
}

async function isAdmin(req: Request, res: Response, next: NextFunction) {
    if(!req.cookies['session']) {
        res.sendStatus(400); // bad req
    }

    try {
        let jwt = await authService.checkSessionToken(req.cookies['session']);
        if(!jwt || !jwt.payload.sub) {
            console.log("no jwt");
            throw new Error("unauth");
        }

        let userDoc = await userService.getUser(jwt.payload.sub);
        if(!userDoc || !userDoc.role || userDoc.role != "admin") {
            console.log(userDoc);
            throw new Error("unauth");
        }
    } catch(e) {
        res.sendStatus(401); // unauth
        return;
    }

    next();
}

export {
    isLoggedIn,
    needsJSON,
    isAdmin
}