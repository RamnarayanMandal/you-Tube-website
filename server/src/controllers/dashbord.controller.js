import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subcription} from "../models/subcription.model.js"
import {Like} from "../models/likes.module.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    
})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const videos = await Video.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerDetails"
            }
        },
        {
            $unwind: "$ownerDetails"
        },
        {
            $lookup: {
                from: "users",
                localField: "ownerDetails._id",
                foreignField: "_id",
                as: "ownerDetailsWithVideoFile"
            }
        },
        {
            $unwind: "$ownerDetailsWithVideoFile"
        },
        {
            $project: {
                _id: 1,
                title: 1,
                description: 1,
                duration: 1,
                views: 1,
                isPublished: 1,
                videoFile: 1,
                owner: "$ownerDetails.username", 
                ownerAvatar: "$ownerDetails.avatar" 
            }
        }
    ]);

    if (!videos || videos.length === 0) {
        throw new ApiError(400, "Videos not found");
    }

    res.status(200).json(
        new ApiResponse(
            200,
            videos,
            "All the Videos fetched successfully"
        )
    );
});



export {
    getChannelStats, 
    getChannelVideos
    }