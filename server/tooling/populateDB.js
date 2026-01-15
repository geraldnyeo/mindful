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
        new User("Alice", "alice@ok.com", "staff", "abc"),
        new User("Bob", "bob@d.com", "volunteer", "def"),
        new User("Charlie", "charlie@c.com", "participant", "efg"),
        new User("Dexter", "d@d.com", "staff", "hunter2"),
        new User("Eve", "eevee@pokemon.net", "staff", "hunter3"),
        new User("Foxie", "f@f.com", "volunteer", "hunter4"),
        new User("Garfield", "ihatemondays@garf.com", "volunteer", "hunter5"),
        new User("Hi", "ok@ok.com", "participant", "ok"),
        new User("Jonkler", "whysoserious@haha.ha", "staff", "byebye"),
        new User("Kale", "cabbage@leaf.com", "participant", "ok2")
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