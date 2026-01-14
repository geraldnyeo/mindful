const { MongoClient, ServerApiVersion } = require('mongodb');
const { MONGODBSTRING } = require('../util/loadEnv');

console.log(`Found MongoDB connection string: ${MONGODBSTRING.substring(0, 15)}...`);
console.log("Creating client...");

var uri = MONGODBSTRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

console.log("Client created");

async function run() {
    try {
        const dev = client.db("dev");
        const users = dev.collection("users");

        const data = [
            {name: "Alice"},
            {name: "Bob"},
            {name: "Charlie"},
            {name: "Dexter"},
            {name: "Eve"},
            {name: "Fox"},
            {name: "Garfield"},
            {name: "Hi"},
            {name: "Jonkler"},
            {name: "Kale"}
        ];
        
        console.log(`Writing ${data.length} entries`);
        const result = await users.insertMany(data);
        console.log("Done!")
        console.log(`Wrote ${result.insertedCount} documents`);
    } finally {
        console.log("Closing MongoDB client");
        await client.close();
        console.log("Closed");
    }
}

run();