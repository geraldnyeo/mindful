/**
 * Shared MongoDB client
 */

const { MongoClient, ServerApiVersion } = require('mongodb');
const { MONGODBSTRING } = require('../util/loadEnv');

// console.log(`Found MongoDB connection string: ${MONGODBSTRING.substring(0, 15)}...`);
// console.log("Creating client...");

var uri = MONGODBSTRING;

let mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// todo: dispatch based on dev and prod envs
const dbClient = mongoClient.db("dev");

// console.log("Client created");

process.on('exit', () => mongoClient.close());

module.exports = {dbClient};