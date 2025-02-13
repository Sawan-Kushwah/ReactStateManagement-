import { Client, Storage, ID } from "appwrite";
import conf from "../conf/conf";


export class UploadService {
    client = new Client();
    bucket;

    constructor() {
        this.client.setEndpoint(conf.AppwriteUrl).setProject(conf.AppwriteProjectID);
        this.bucket = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.AppwriteBucketID,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Upload service :: upload file error :: ", error);
            throw error;
        }
    }

    async deleteFile(fileID) {
        try {
            return await this.bucket.deleteFile(
                conf.AppwriteBucketID,
                fileID,
            )
        } catch (error) {
            console.log("Upload service :: delete file error :: ", error);
            throw error;
        }
    }

    filePreview(fileID) {
        try {
            return this.bucket.getFilePreview(
                conf.AppwriteBucketID,
                fileID,
            )
        } catch (error) {
            console.log("Upload service ::  file preview error :: ", error);
            throw error;
        }
    }
}

const uploadService = new UploadService()

export default uploadService;
