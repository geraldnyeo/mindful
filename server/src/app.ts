import https from 'https';
import fs from 'fs';
import express from 'express';
import { PORT, CLIENTORIGIN } from './util/loadEnv.js';
import { User, userService } from './services/userService.js';
import cors from 'cors';
import authService from './services/authService.js';
import { signup, login } from './api_routes/auth.js';
import type { Request, Response } from 'express';

const app = express();

// Allow only client to access resources
// Define client origin in .env
const corsOptions = {
    origin: CLIENTORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
}

app.use(cors(corsOptions));

app.get('/', (req: Request, res: Response) => {
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

app.post('/api/auth/signup', signup);

app.post('/api/auth/login', login);

// Upgrade to HTTPS as we will be handling credentials
const httpsOptions = {
    key: fs.readFileSync("privatekey.key"),
    cert: fs.readFileSync("certificate.crt")
}

const httpsServer = https.createServer(httpsOptions, app);

httpsServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});