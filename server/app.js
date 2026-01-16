const https = require('https');
const fs = require('fs');
const express = require('express');
const { PORT, CLIENTORIGIN } = require('./util/loadEnv');
const { User, userService } = require('./services/userService');

const cors = require('cors');
const { authService } = require('./services/authService');
const app = express();

// Allow only client to access resources
// Define client origin in .env
const corsOptions = {
    origin: CLIENTORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello World!')
});

// only allow json requests for api call
app.use('/api/', (req, res, next) => {
    if(!req.is('application/json')) {
        res.sendStatus(415); // unsupported media type
        return;
    }

    next();
});

app.use('/api/', express.json());

app.post('/api/auth/signup', async (req, res) => {
    // console.log(req);
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
});

app.post('/api/auth/login', async (req, res) => {
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
});

// Upgrade to HTTPS as we will be handling credentials
const httpsOptions = {
    key: fs.readFileSync("privatekey.key"),
    cert: fs.readFileSync("certificate.crt")
}

const httpsServer = https.createServer(httpsOptions, app);

httpsServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});