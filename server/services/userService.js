const { ObjectId } = require("mongodb");
const { dbClient } = require("../lib/dbClient");

/**
 * Helper class for validation of user role
 */
class UserRole {
    static validate(role) {
        switch(role) {
            case "guest":
            case "participant":
            case "volunteer":
            case "staff":
                return true;
            default:
                return false;
        }
    }
}

/**
 * User of the website
 */
class User {
    constructor(name, role, id=null) {
        this.name = name;
        this.id = id;
        UserRole.validate(role);
        this.role = role;
        this.joinedDate = new Date();
    }

    /**
     * Converts User data to a form compatible with the DB
     * @returns JSON object to pass to dbClient
     */
    toDBJSON() {
        let out = {
            name: this.name,
            role: this.role,
            joinedDate: this.joinedDate
        }
        if(this.id != null) {
            out["_id"] = ObjectId(this.id);
        }
        return out;
    }
}

/**
 * Collection of methods to do with user profiles
 */
class UserService {
    /**
     * Creates a user in the DB
     * @param {User} user 
     */
    async createUser(user) {
        if(!(user instanceof User)) {
            throw new Error("User object is not of correct type");
        }
        let users = dbClient.collection("users");
        await users.insertOne(user.toDBJSON());
        console.log("Created user");
    }

    /**
     * Deletes a user from DB given their _id
     * @param {string} id 
     */
    async deleteUser(id) {
        let users = dbClient.collection("users");
        let res = await users.findOneAndDelete({_id: new ObjectId(id)});
        if(!res) {
            throw new Error("Failed to delete user or user does not exist");
        }
        console.log("Deleted user");
    }
}

// instantiate each UserService individually or share globally?
const userService = new UserService();

module.exports = {
    UserRole,
    User,
    userService
}