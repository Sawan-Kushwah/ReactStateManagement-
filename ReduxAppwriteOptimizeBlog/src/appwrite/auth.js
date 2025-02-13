import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setProject(conf.AppwriteProjectID);
        this.account = new Account(this.client);
    }

    async createUser({ email, password, name }) {
        try {
            const response = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            return response;
        } catch (error) {
            console.log("authservice :: Error in createUser :: ", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("authservice :: login error :: ", error);
            throw error;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("authservice :: Logout error :: ", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("authservice :: Get user error :: ", error);
            throw error;
        }
    }
}

const authservice = new AuthService();

export default authservice;