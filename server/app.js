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
})

// Upgrade to HTTPS as we will be handling credentials
const httpsOptions = {
  key: fs.readFileSync("privatekey.key"),
  cert: fs.readFileSync("certificate.crt")
}

const httpsServer = https.createServer(httpsOptions, app);

httpsServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});