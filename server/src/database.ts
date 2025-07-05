import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export const connectToDatabase = async () => {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    console.log(`Successfully connected to mongodb at ${mongoUri}`);
};