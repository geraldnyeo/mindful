const https = require('https');
const fs = require('fs');
const express = require('express');
const { PORT, CLIENTORIGIN } = require('./util/loadEnv');
const { User, userService } = require('./services/userService');

const cors = require('cors');
const { authService } = require('./services/authService');
const { login, signup } = require('./api_routes/auth');
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