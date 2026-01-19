import authService from "../services/authService.js";
import { userService, User } from "../services/userService.js";
import type { NextFunction, Request, Response } from "express";

async function signup(req: Request, res: Response, next: NextFunction) {
    if(!authService.validateAPISignupInput(req.body)) {
        res.sendStatus(400); // bad req
        return;
    }
    
    try {
        const {name, email, role, pw} = req.body;
        let user = new User(name, email, role, pw);
        const createdUserDoc = await userService.createUser(user);
        const jwt = authService.generateSessionToken(createdUserDoc.insertedId.toString());
        const userDoc = await userService.getUser(createdUserDoc.insertedId.toString());
        if(!userDoc) {
            throw new Error("Failed to get created user details");
        }
        user = User.fromDBJSON(userDoc);
        res.cookie('session', jwt, {httpOnly: true, sameSite: 'none', secure: true});
        res.status(200); // ok
        res.send(user.toClientJSONBasic());
        return;
    } catch(e) {
        console.error(e);
        res.sendStatus(500); // ise
        return;
    }
}

async function login(req: Request, res: Response) {
    if(!authService.validateAPILoginInput(req.body)) {
        res.sendStatus(400); // bad req
        return;
    }

    try {
        const {email, pw} = req.body;
        const passwordOk = await authService.checkPasswordEmail(email, pw);
        if(!passwordOk) {
            res.sendStatus(401) // unauth
            return;
        }
        const userDoc = await userService.getUserByEmail(email);
        if(!userDoc) {
            throw new Error("Unable to get user details when signing in");
        }
        const jwt = await authService.generateSessionToken(userDoc._id.toString());
        const user = User.fromDBJSON(userDoc);
        res.cookie('session', jwt, {httpOnly: true, sameSite: 'none', secure: true});
        res.status(200); // ok
        res.send(user.toClientJSONBasic());
        return;
    } catch(e) {
        console.error(e);
        res.sendStatus(500); // ise
        return;
    }
}

async function refresh(req: Request, res: Response) {
    const id = await authService.getIdFromToken(req.cookies['session']);
    
    try {
        if(!id) {
            throw new Error("Session token has no sub?");
        }

        const jwt = await authService.generateSessionToken(id);

        res.cookie('session', jwt, {httpOnly: true, sameSite: 'none', secure: true});
        res.status(200); // ok
        res.send();
        return;
    } catch(e) {
        console.error(e);
        res.sendStatus(500) // ise
        return;
    }
}

export {signup as authAPISignup, 
        login as authAPILogin,
        refresh as authAPIRefresh
};