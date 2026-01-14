/**
 * Helper script to nuke DB
 */

const readline = require('node:readline');
const { dbClient } = require('../lib/dbClient');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Are you SURE you want to NUKE the DB? Type 'y' to confirm`, res => {
    console.log(`Received response ${res}`);
    if(res != 'y') {
        console.log("Aborting...");
    } else {
        run();
    }
});

// function setup() {
//     console.log("Proceeding to nuke DB...");

//     console.log(`Found MongoDB connection string: ${MONGODBSTRING.substring(0, 15)}...`);
//     console.log("Creating client...");

//     var uri = MONGODBSTRING;

//     const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
//     });

//     console.log("Client created");

//     run(client).then(() => process.exit());
// }

async function run() {
    console.log("Dropping dev database");
    const result = await dbClient.dropDatabase();
    if(result) {
        console.log("Dropped dev database");
    } else {
        console.log("Uh oh something went wrong");
    }
    process.exit();
}
