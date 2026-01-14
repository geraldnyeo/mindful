const express = require('express');
const { PORT } = require('./util/loadEnv');
const { User, userService } = require('./services/userService');

// const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${port}`)
// })

let test = new User("Test", "volunteer");
userService.createUser(test);