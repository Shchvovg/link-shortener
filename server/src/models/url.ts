import mongoose, { Schema } from "mongoose";
import { Scheduler } from "timers/promises";

export interface IUrl extends Document{
    originalUrl: string;
    shortCode: string;
    clicks: number;
    createdAt: Date;
}

const UrlSchema: Schema = new Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model<IUrl>('Url', UrlSchema);