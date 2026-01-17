/**
 * Populates the DB with test data
 */

// const { dbClient } = require('../lib/dbClient');
// const { Activity, ActivityDetails } = require('../services/eventService');
// const { User } = require('../services/userService');

import dbClient from "../lib/dbClient.js";
import { Activity, ActivityDetails } from "../services/eventService.js";
import { User } from "../services/userService.js";

async function run() {
    const users = dbClient.collection("users");
    const activities = dbClient.collection("activities");

    const userData = [
        new User("Alice", "alice@ok.com", "staff", {pw: "abc"}),
        new User("Bob", "bob@d.com", "volunteer", {pw: "def"}),
        new User("Charlie", "charlie@c.com", "participant", {pw: "efg"}),
        new User("Dexter", "d@d.com", "staff", {pw: "hunter2"}),
        new User("Eve", "eevee@pokemon.net", "staff", {pw: "hunter3"}),
        new User("Foxie", "f@f.com", "volunteer", {pw: "hunter4"}),
        new User("Garfield", "ihatemondays@garf.com", "volunteer", {pw: "hunter5"}),
        new User("Hi", "ok@ok.com", "participant", {pw: "ok"}),
        new User("Jonkler", "whysoserious@haha.ha", "staff", {pw: "byebye"}),
        new User("Kale", "cabbage@leaf.com", "participant", {pw: "ok2"})
    ];
    
    {
        console.log(`Writing ${userData.length} user entries`);
        const out = userData.map(user => user.toDBJSON());
        const result = await users.insertMany(out);
        console.log("Done!")
        console.log(`Wrote ${result.insertedCount} documents`);
    }

    const activityData = [
        new Activity("Apple picking",
            "apple place",
            new Date(),
            new Date(new Date().getTime() + 1000),
            "time to pick apples"),
        new Activity("Banana kicking",
            ":o",
            new Date(),
            new Date(new Date().getTime() + 5000),
            "wow")
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