const { MongoClient, ServerApiVersion } = require('mongodb');
const { MONGODBSTRING } = require('../util/loadEnv');
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Are you SURE you want to NUKE the DB? Type 'y' to confirm`, res => {
    console.log(`Received response ${res}`);
    if(res != 'y') {
        console.log("Aborting...");
    } else {
        setup();
    }
});

function setup() {
    console.log("Proceeding to nuke DB...");

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

    run(client).then(() => process.exit());
}

async function run(client) {
    try {
        console.log("Dropping dev database");
        const dev = client.db("dev");
        const result = await dev.dropDatabase();
        if(result) {
            console.log("Dropped dev database");
        } else {
            console.log("Uh oh something went wrong");
        }

    } finally {
        console.log("Closing MongoDB client");
        await client.close();
        console.log("Closed");
    }
}
