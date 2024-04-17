import { Timestamp } from "mongodb";
import mongoose from "mongoose";
import { Schema } from "mongoose";

const subcriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId, // one who is subscribing
        ref: "User",
    },
    channel: {
        type: Schema.Types.ObjectId, // one who is subscribing channel
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
},{Timestamps:true})

export const Subcription = new mongoose.model("Subcription",subcriptionSchema)
