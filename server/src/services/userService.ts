import { ObjectId, type Document, type WithId } from "mongodb";
import dbClient from "../lib/dbClient.js";
import authService from "./authService.js";
import { hasString, hasDate } from "../util/checkProperty.js";

type UserRole = "guest" |
                "participant" |
                "volunteer" |
                "staff";

const userOptionsDefault = {
    pw: null,
    pwHashed: false,
    joinedDate: null,
    id: null
} as any;

/**
 * User of the website
 */
class User {
    name: string;
    email: string;
    id: string | null;
    role: UserRole;
    joinedDate: Date;
    pw?: string;

    static fromDBJSON(document: WithId<Document>) {
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

    constructor(name: string, email: string, role: UserRole, options = userOptionsDefault) {
        options = {...userOptionsDefault, ...options};
        this.name = name;
        this.email = email;
        this.id = options.id;
        if(!options.pwHashed && options.pw !== null) {
            this.pw = authService.hashPassword(options.pw);
        }
        // UserRole.validate(role);
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
        } as Record<string, any>;
        if(this.pw != null) {
            out["pw"] = this.pw;
        }
        if(this.id != null) {
            out["_id"] = new ObjectId(this.id);
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
    async createUser(user: User) {
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
    async deleteUser(id: string) {
        let users = dbClient.collection("users");
        let res = await users.findOneAndDelete({_id: new ObjectId(id)});
        if(!res) {
            throw new Error("Failed to delete user or user does not exist");
        }
        console.log("Deleted user");
    }

    async getUser(id: string) {
        let users = dbClient.collection("users");
        let res = await users.findOne({_id: new ObjectId(id)});
        return res;
    }

    async getUserByEmail(email: string) {
        let users = dbClient.collection("users");
        let res = await users.findOne({email: email});
        return res;
    }

    async getUserBatch(ids: string[]) {
        let users = dbClient.collection("users");
        let res = await users.find({_id: {
            $in: ids.map(id => new ObjectId(id))
        }});
        let docs = await res.toArray();
        // console.log(res);
        let userObjs = docs.map(item => User.fromDBJSON(item));
        console.log(users);
        let out: Record<string, User> = {};
        for(const user of userObjs) {
            if(user.id) out[user.id] = user;
        }
        return out;
    }
}

// instantiate each UserService individually or share globally?
const userService = new UserService();

export {type UserRole, User, userService};