import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";

export class DatabaseServices {
    client = new Client();
    databases;

    constructor() {
        this.client.setEndpoint(conf.AppwriteUrl).setProject(conf.AppwriteProjectID);
        this.databases = new Databases(this.client);
    }

    async createPost({ title, slug, content, featuredImage, userId, status }) {
        try {
            return await this.databases.createDocument(
                conf.AppwriteDatabaseID,
                conf.AppwriteCollectionID,
                ID.unique(),
                {
                    title,
                    content,
                    featuredImage,
                    userId,
                    status,
                    slug
                }
            )
        } catch (error) {
            console.log("Appwrite service :: Create post error :: ", error);
            throw error;
        }
    }

    async updatePost(id, { title, content, featuredImage, userId, status, slug }) {
        try {
            // this is not write approach to handle because slug may change we cannot used it as our id
            // for the sake of completion 
            // return await this.databases.updateDocument(
            //     conf.AppwriteDatabaseID,
            //     conf.AppwriteCollectionID,
            //     slug,
            //     {
            //         title,
            //         content,
            //         featuredImage,
            //         userId,
            //         status
            //     }
            // )


            return await this.databases.updateDocument(
                conf.AppwriteDatabaseID,
                conf.AppwriteCollectionID,
                id,
                {
                    title,
                    content,
                    featuredImage,
                    userId,
                    status,
                    slug
                }
            )
        } catch (error) {
            console.log("Appwrite service :: update post error :: ", error);
            throw error;
        }
    }

    async deletePost(id) {
        try {
            return await this.databases.deleteDocument(
                conf.AppwriteDatabaseID,
                conf.AppwriteCollectionID,
                id,
            )
        } catch (error) {
            console.log("Appwrite service :: delete post error :: ", error);
            throw error;
        }
    }

    async getAllPost(querries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                conf.AppwriteDatabaseID,
                conf.AppwriteCollectionID,
                querries,
            )
        } catch (error) {
            console.log("Appwrite service :: get all post error :: ", error);
            throw error;
        }
    }


    async getPost(id) {
        try {
            return await this.databases.getDocument(
                conf.AppwriteDatabaseID,
                conf.AppwriteCollectionID,
                id
            )
        } catch (error) {
            console.log("Appwrite service :: get post error :: ", error);
            throw error;
        }
    }

}

const service = new DatabaseServices();
export default service;