/**
 * Parse loaded env vars
 */

const { loadEnvFile } = require('node:process');

loadEnvFile(".env");

if(!process.env.PORT) {
    throw new Error("Port not specified in .env");
} else {
    let processed = Number(process.env.PORT);
    if(typeof(processed) != "number") {
        throw new Error("Port is not a number, got: " + process.env.PORT);
    }
    process.env.PORT = processed;
    var PORT = process.env.PORT;
}

if(!process.env.MONGODBSTRING) {
    throw new Error("MongoDB connection string not specified in .env");
} else {
    var MONGODBSTRING = process.env.MONGODBSTRING;
}

module.exports = {PORT, MONGODBSTRING};