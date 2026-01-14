const express = require('express');
const { PORT, CLIENTORIGIN } = require('./util/loadEnv');
const { User, userService } = require('./services/userService');

const cors = require('cors');
const app = express();

// Allow only client to access resources
// Define client origin in .env
var corsOptions = {
  origin: CLIENTORIGIN,
  methods: ["GET", "POST"],
  credentials: true,
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
