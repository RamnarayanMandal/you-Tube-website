import mongoose from "mongoose";
import { Like } from "../models/likes.module.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Toggle like for a video
const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!videoId) {
        throw new ApiError(400, "Video ID is required");
    }

    try {
        const existingLike = await Like.findOne({ video: videoId, likeBy: req.user._id });
        if (existingLike) {
            await Like.findByIdAndDelete(existingLike._id);
            return res.status(200).json(new ApiResponse(200, {}, "Unliked successfully"));
        } else {
            const like = await Like.create({
                video: videoId,
                likeBy: req.user._id,
                isLiked: true
            });

            if (!like) {
                throw new ApiError(500, "Like creation failed");
            }

            return res.status(201).json(new ApiResponse(201, like, "Liked successfully"));
        }
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

// Toggle dislike for a video
const toggleVideoDisLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!videoId) {
        throw new ApiError(400, "Video ID is required");
    }

    try {
        const disLike = await Like.findOneAndUpdate({ video: videoId, likeBy: req.user._id }, { isLiked: false }, { new: true });

        if (!disLike) {
            throw new ApiError(500, "Dislike creation failed");
        }

        return res.status(201).json(new ApiResponse(201, disLike, "Disliked successfully"));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

// Toggle like for a comment
const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    if (!commentId) {
        throw new ApiError(400, "Comment ID is required");
    }

    try {
        const like = await Like.create({
            commentId: commentId,
            userId: req.user?._id,
            isLiked: true
        });

        if (!like) {
            throw new ApiError(500, "Like creation failed");
        }

        return res.status(201).json(new ApiResponse(201, like, "Liked successfully"));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

// Toggle dislike for a comment
const toggleCommentDisLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    if (!commentId) {
        throw new ApiError(400, "Comment ID is required");
    }

    try {
        const existingDislike = await Like.findOne({ commentId: commentId, likeBy: req.user._id, isLiked: false });
        if (existingDislike) {
            await Like.findByIdAndDelete(existingDislike._id);
            return res.status(200).json(new ApiResponse(200, {}, "Undisliked successfully"));
        } else {
            const dislike = await Like.create({
                commentId: commentId,
                likeBy: req.user._id,
                isLiked: false
            });

            if (!dislike) {
                throw new ApiError(500, "Dislike creation failed");
            }

            return res.status(201).json(new ApiResponse(201, dislike, "Disliked successfully"));
        }
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

// Toggle like for a tweet
const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    if (!tweetId) {
        throw new ApiError(400, "Tweet ID is required");
    }

    try {
        const like = await Like.create({
            tweetId: tweetId,
            userId: req.user?._id,
            isLiked: true
        });

        if (!like) {
            throw new ApiError(500, "Like creation failed");
        }

        return res.status(201).json(new ApiResponse(201, like, "Liked successfully"));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

// Toggle dislike for a tweet
const toggleTweetDisLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    if (!tweetId) {
        throw new ApiError(400, "Tweet ID is required");
    }

    try {
        const existingDislike = await Like.findOne({ tweetId: tweetId, likeBy: req.user._id, isLiked: false });
        if (existingDislike) {
            await Like.findByIdAndDelete(existingDislike._id);
            return res.status(200).json(new ApiResponse(200, {}, "Undisliked successfully"));
        } else {
            const dislike = await Like.create({
                tweetId: tweetId,
                likeBy: req.user._id,
                isLiked: false
            });

            if (!dislike) {
                throw new ApiError(500, "Dislike creation failed");
            }

            return res.status(201).json(new ApiResponse(201, dislike, "Disliked successfully"));
        }
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

// Get all liked videos
const getLikedVideos = asyncHandler(async (req, res) => {
    const { likeBy } = req.params;
    if (!likeBy) {
        throw new ApiError(400, "User ID is required");
    }
    try {
        const likedVideos = await Like.aggregate([
            {
                $match: {
                    likeBy: new mongoose.Types.ObjectId(likeBy),
                    // isLiked: true
                }
            },
            {
                $lookup: {
                    from: 'videos', // The name of the video collection
                    localField: 'video',
                    foreignField: '_id',
                    as: 'videoDetails'
                }
            },
            {
                $unwind: '$videoDetails' // Unwind the array to get objects
            },
            {
                $project: {
                    _id: 0,
                    videoDetails: 1
                }
            }
        ]);

        return res.status(200).json(new ApiResponse(200, likedVideos, "Liked videos fetched successfully"));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});


const getLikeVidees = asyncHandler(async (req, res) => {
    const {videoId} = req.params;
    if (!videoId) {
        throw new ApiError(400, "Video ID is required");
    }
    const like = await Like.aggregate([
        {
          "$match": {
            "video":new mongoose.Types.ObjectId(videoId) 
          }
        },
        {
          "$group": {
            "_id": "$video",
            "totalLikes": { "$sum": 1 },
            "isLiked": { "$first": "$isLiked" }, 
            "createdAt": { "$first": "$createdAt" }, 
            "likeBy": { "$first": "$likeBy" } 
          }
        },
        {
          "$project": {
            "totalLikes": 1,
            "isLiked": 1,
            "createdAt": 1,
            "likeBy": 1
          }
        }
      ]
      )

   if(!like){
    throw new ApiError(500, "like is not available for this video");
   }

   return res.status(200).json(new ApiResponse(200, like ," totalLikes is fetched successfully"))


});

export {
    toggleVideoLike,
    toggleVideoDisLike,
    toggleCommentLike,
    toggleCommentDisLike,
    toggleTweetLike,
    toggleTweetDisLike,
    getLikedVideos,
    getLikeVidees
};
