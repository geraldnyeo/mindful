/**
 * Populates the DB with test data
 */

const { dbClient } = require('../lib/dbClient');
const { Activity, ActivityDetails } = require('../services/eventService');
const { User } = require('../services/userService');

async function run() {
    const users = dbClient.collection("users");
    const activities = dbClient.collection("activities");

    const userData = [
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
    
    {
        console.log(`Writing ${userData.length} user entries`);
        const out = userData.map(user => user.toDBJSON());
        const result = await users.insertMany(out);
        console.log("Done!")
        console.log(`Wrote ${result.insertedCount} documents`);
    }

    const activityData = [
        new Activity("Apple picking", new Date(), new Date(Date.now() + 1000)),
        new Activity("Banana kicking", new Date() + 200, new Date(Date.now() + 1000))
                .setDescription("Banana epic")
                .setDetails(new ActivityDetails(true, false, [], "everywhere"))
    ];

    {
        console.log(`Writing ${activityData.length} activity entries`);
        const out = activityData.map(act => act.toDBJSON());
        const result = await activities.insertMany(out);
        console.log("Done!")
        console.log(`Wrote ${result.insertedCount} documents`);
    }
    process.exit();
}

run();