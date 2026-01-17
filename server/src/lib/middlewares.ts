import type { Request, Response, NextFunction } from "express";
import authService from "../services/authService.js";

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

export {
    isLoggedIn,
    needsJSON
}