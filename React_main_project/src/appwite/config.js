import { Client, ID, Databases, Storage, Query } from "appwrite";
import config from "../conf";

export class Service {
    client = new Client()
    databases;
    bucket

    constructor() {
        this.client
            .setEndpoint(conf.VITE_APPWRITE_URL)
            .setProject(conf.VITE_APPWRITE_PROJECT_ID);

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, feturnedimage, status, userid }) {
        try {
            return await this.databases.createDocument(
                conf.VITE_APPWRITE_DATABASE_ID,
                conf.VITE_APPWRITE_COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    feturnedimage,
                    status,
                    userid,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, { title, content, feturnedimage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.VITE_APPWRITE_DATABASE_ID,
                conf.VITE_APPWRITE_COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    feturnedimage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.VITE_APPWRITE_DATABASE_ID,
                conf.VITE_APPWRITE_COLLECTION_ID,
                slug)

            return true
        } catch (error) {
            console.log("there is an erorr in the config -> deletePost method")
            return false
        }

    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.VITE_APPWRITE_DATABASE_ID,
                conf.VITE_APPWRITE_COLLECTION_ID,
                slug
            )

        } catch (error) {
            console.log("there is an error in the config -> getPost")
            return false
        }

    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.VITE_APPWRITE_DATABASE_ID,
                conf.VITE_APPWRITE_COLLECTION_ID,
                queries
            )

        } catch (error) {
            console.log("there is an error in the config -> getPostS")
            return false
        }

    }

    async uploadFiles(file) {
        try {
            return await this.bucket.createFile(
                conf.VITE_APPWRITE_BUCKET_ID, ID.unique(), file)
        } catch (error) {
            console.log("there is an error in the config -> uploadfiles")
            return false
        }
    }

    async deleteFiles(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.VITE_APPWRITE_BUCKET_ID,
                fileId
            )

            return true
        } catch (error) {
            console.log("error in config :: deletefiles ", error)
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.VITE_APPWRITE_BUCKET_ID,
            fileId
        )
    }

    getFileDownload(fileId) {
        return this.bucket.getFileDownload(
            conf.VITE_APPWRITE_BUCKET_ID, fileId
        )
    }

}

const service = new Service();
export default service