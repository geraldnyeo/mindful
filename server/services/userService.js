const { ObjectId } = require("mongodb");
const { dbClient } = require("../lib/dbClient");
const { authService } = require("./authService");
const { hasString, hasDate } = require("../util/checkProperty");

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

const userOptionsDefault = {
    pw: null,
    pwHashed: false,
    joinedDate: null,
    id: null
}

/**
 * User of the website
 */
class User {
    static fromDBJSON(document) {
        if(!hasString(document, "name") ||
           !hasString(document, "email") ||
           !hasString(document, "role") ||
           !hasDate(document, "joinedDate")) {
            console.error(document);
            throw new Error("Invalid document, missing fields for User");   
        }

        return new User(document.name, 
                        document.email, 
                        document.role,
                        {
                            id: document._id.toString(),
                            joinedDate: document.joinedDate
                        });
    }

    constructor(name, email, role, options = userOptionsDefault) {
        options = {...userOptionsDefault, ...options};
        this.name = name;
        this.email = email;
        this.id = options.id;
        if(!options.pwHashed && options.pw !== null) {
            this.pw = authService.hashPassword(options.pw);
        }
        UserRole.validate(role);
        this.role = role;
        if(options.joinedDate) {
            this.joinedDate = options.joinedDate;
        } else {
            this.joinedDate = new Date();
        }
    }

    /**
     * Converts User data to a form compatible with the DB
     * @returns JSON object to pass to dbClient
     */
    toDBJSON() {
        let out = {
            name: this.name,
            email: this.email,
            role: this.role,
            joinedDate: this.joinedDate
        }
        if(this.pw != null) {
            out["pw"] = this.pw;
        }
        if(this.id != null) {
            out["_id"] = ObjectId(this.id);
        }
        return out;
    }

    toClientJSONBasic() {
        let out = {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
            joinedDate: this.joinedDate
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
        let res = await users.insertOne(user.toDBJSON());
        console.log("Created user");
        return res;
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

    async getUser(id) {
        let users = dbClient.collection("users");
        let res = await users.findOne({_id: new ObjectId(id)});
        return res;
    }

    async getUserByEmail(email) {
        let users = dbClient.collection("users");
        let res = await users.findOne({email: email});
        return res;
    }
}

// instantiate each UserService individually or share globally?
const userService = new UserService();

module.exports = {
    UserRole,
    User,
    userService
}