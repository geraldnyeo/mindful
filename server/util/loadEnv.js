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

if(!process.env.CLIENTORIGIN) {
    throw new Error("Client origin not specified in .env, this is required for CORS");
} else {
    var CLIENTORIGIN = process.env.CLIENTORIGIN;
}

if(!process.env.JWTSECRET) {
    throw new Error("JWT secret not specified in .env");
} else {
    var JWTSECRET = new TextEncoder().encode(process.env.JWTSECRET);
}

module.exports = {PORT, MONGODBSTRING, CLIENTORIGIN, JWTSECRET};