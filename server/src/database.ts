import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { version } from "os";
import { strict } from "assert";

const { MongoClient, ServerApiVersion } = require("mongodb");

export const connectToDatabase = async (mongoUri) => {
    const client = new MongoClient(mongoUri, {
        ServerApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    
    await client.connect();

    //const mongoServer = await MongoMemoryServer.create();
    //const mongoUri = mongoServer.getUri();
    //await mongoose.connect(mongoUri);
    //console.log(`Successfully connected to mongodb at ${mongoUri}`);
};