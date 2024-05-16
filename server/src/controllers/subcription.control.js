import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Subcription } from "../models/subcription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    if (!channelId) {
        throw new ApiError(400, "Channel ID is required");
    }
    const subscriberId = req.user.id;
    if (!mongoose.isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid Channel ID");
    }
    let existingSubscription = await Subcription.findOne({ channel: channelId, subscriber: subscriberId });
    if (existingSubscription) {
        // If subscription already exists, toggle it off (unsubscribe)
        const unsubscribe = await Subcription.findByIdAndDelete(existingSubscription._id);
        return res
            .status(200)
            .json(
             new ApiResponse(200,
            unsubscribe,
             "Unsubscribed successfully"));
    } else {
        const subscriber = await Subcription.create({ channel: channelId, subscriber: subscriberId });
        return res.
            status(200)
            .json(
                new ApiResponse(200,
                    subscriber,
                    "Subscribed successfully"));
    }
});

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    if (!channelId) {
        throw new ApiError(400, "Channel ID is required");
    }
    try {
        const subscribers = await Subcription.aggregate([
            {
                $match: { channel: new mongoose.Types.ObjectId(channelId) }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "subscriber",
                    foreignField: "_id",
                    as: "subscriber"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "channel",
                    foreignField: "_id",
                    as: "channel"
                }
            },
            {
                $addFields: {
                    subscriberCount: { $size: "$subscriber" },
                    channelSubscribedToCount: { $size: "$channel" },
                    isSubscribed: true
                }
            },
            {
                $project: {
                    _id: 0,
                    subscriber: 1,
                    channel: 1,
                    subscriberCount: 1,
                    channelSubscribedToCount: 1,
                    isSubscribed: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: subscribers,
            message: "Successfully fetched subscribers"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params;
    if (!subscriberId) {
        throw new ApiError(400, "Invalid Subscriber ID");
    }
    try {
        const channels = await Subcription.aggregate([
            {
                $match: { subscriber: new mongoose.Types.ObjectId(subscriberId) }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "subscriber",
                    foreignField: "_id",
                    as: "subscriberTO"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "channel",
                    foreignField: "_id",
                    as: "channel"
                }
            },
            {
                $addFields: {
                    subscriberCount: { $size: "$subscriberTO" },
                    channelSubscribedToCount: { $size: "$channel" },
                    isSubscribed: true
                }
            },
            {
                $project: {
                    _id: 0,
                    subscriberTO: 1,
                    channel: 1,
                    subscriberCount: 1,
                    channelSubscribedToCount: 1,
                    isSubscribed: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: channels,
            message: "Subscribed Channels fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

const checkSubcriber = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        throw new ApiError(400, "Invalid Subscriber ID");
    }
    try {
        const user = await Subcription.aggregate([
            {
                $match: {
                    subscriber:new mongoose.Types.ObjectId(userId)
                },
                
            },
            {
                "$group": {
                  "_id": "$subscriber",
                  "count": { "$sum": 1 }
                }
              },
        ]);
        
        res.status(200).json({
            success: true,
            data: user,
            message: "Subscribed Channels fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels,
    checkSubcriber
};
