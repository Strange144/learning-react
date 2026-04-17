import { Client, Account, ID } from "appwrite";
import config from "../conf";

export class Authservice {
    client = new Client()
    Account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount(name, email, password) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return
                return this.login(email, password)
            } else {
                return userAccount
            }
        } catch (error) {
            console.log("there is an error in the create account method")
        }
    }

    async login(emial, password) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log("there is an error in the login function")
        }
    }

    async getcurrentuser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("ther is an error in the getcurrentuser")
        }

    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("error loggin out ")
        }
    }
}

const authservice = new Authservice();
export default authservice