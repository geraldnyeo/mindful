/**
 * Populates the DB with test data
 */

const { dbClient } = require('../lib/dbClient');
const { User } = require('../services/userService');

async function run() {
    const users = dbClient.collection("users");

    const data = [
        new User("Alice", "staff"),
        new User("Bob", "volunteer"),
        new User("Charlie", "participant"),
        new User("Dexter", "staff"),
        new User("Eve", "staff"),
        new User("Foxie", "volunteer"),
        new User("Garfield", "volunteer"),
        new User("Hi", "participant"),
        new User("Jonkler", "staff"),
        new User("Kale", "participant")
    ];
    
    console.log(`Writing ${data.length} entries`);
    const out = data.map(user => user.toDBJSON());
    const result = await users.insertMany(out);
    console.log("Done!")
    console.log(`Wrote ${result.insertedCount} documents`);
    process.exit();
}

run();