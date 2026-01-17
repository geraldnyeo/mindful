const { authService } = require("../services/authService");
const { userService, User } = require("../services/userService");

async function signup(req, res) {
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
        user = User.fromDBJSON(userDoc);
        res.cookie('session', jwt, {httpOnly: true});
        res.status(200); // ok
        res.send(user.toClientJSONBasic());
        return;
    } catch(e) {
        console.error(e);
        res.sendStatus(500); // ise
        return;
    }
}

async function login(req, res) {
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
        const jwt = await authService.generateSessionToken(userDoc._id.toString());
        const user = User.fromDBJSON(userDoc);
        res.cookie('session', jwt, {httpOnly: true});
        res.status(200); // ok
        res.send(user.toClientJSONBasic());
        return;
    } catch(e) {
        console.error(e);
        res.sendStatus(500); // ise
        return;
    }
}

module.exports = {
    signup,
    login
}