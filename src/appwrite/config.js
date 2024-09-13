import conf from "../conf/conf";
import { Client, Databases, ID } from "appwrite";

export class Service {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createUserRoleInDatabase({ userID, role }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                userID,
                {
                    userID,
                    role,
                }
            );
        } catch (error) {
            console.log(
                "Appwrite Service :: createUserRoleInDatabase :: error",
                error
            );
        }
    }
}

const appwriteService = new Service();
export default appwriteService;
