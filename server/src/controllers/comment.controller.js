import mongoose from "mongoose"
import {Comment} from "../models/comments.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    // Get all comments for a video
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // Check if videoId is provided
    if (!videoId) {
        throw new ApiError(400, "videoId is required");
    }

    // Define the aggregation pipeline
    const pipeline = [
        {
            "$match": {
                "video": new mongoose.Types.ObjectId(videoId) // Convert videoId to ObjectId
            }
        },
        {
            "$lookup": {
                "from": "users",
                "localField": "commentBy",
                "foreignField": "_id",
                "as": "result"
            }
        },
        {
            "$unwind": "$result" // Unwind the result array to access its fields directly
        },
        {
            "$project": {
                "_id": 0, // Exclude the _id field if not needed
                "createdAt": 1,
                "updatedAt": 1,
                "comment": 1,
                "video": 1,
                "username": "$result.username",
                "email": "$result.email",
                "fullName": "$result.fullName",
                "avatar": "$result.avatar"
            }
        }
    ];

    // Execute the aggregation pipeline
    const comments = await Comment.aggregate(pipeline);

    // Check if comments were fetched
    if (!comments || comments.length === 0) {
        throw new ApiError(404, "Comments not found");
    }

    // Send the response
    res.status(200).json(new ApiResponse(200, comments, "Comments fetched successfully"));
});


const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const {videoId} = req.params
    if(!videoId){
        throw new ApiError(400,"video is required")
    }
    const {comment} = req.body
    if(!comment){
        throw new ApiError(400,"text is required")
    }
    const commentRes = await Comment.create({
        comment,
        video: videoId,
        commentBy:req.user._id
    })
    if(!comment){
        throw new ApiError(500,"Comment could not be created")
    }
    res.status(201).json(new ApiResponse(201, commentRes, "Comment added successfully"))
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const {commentId} = req.params
    if(!commentId){
        throw new ApiError(400,"commentId is required")
    }
    const {comment} = req.body
    if(!comment){
        throw new ApiError(400,"comment is required")
    }
    const commentRes = await Comment.findByIdAndUpdate(commentId, {comment}, {new: true})
    if(!comment){
        throw new ApiError(500,"Comment could not be updated")
    }
    res.status(201).json(new ApiResponse(201, commentRes, "Comment updated successfully"))
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const {commentId} = req.params
    if(!commentId){
        throw new ApiError(400,"commentId is required")
    }
    const comment = await Comment.findByIdAndDelete(commentId)
    if(!comment){
        throw new ApiError(500,"Comment could not be deleted")
    }
    res.status(201).json(new ApiResponse(201, comment, "Comment deleted successfully"))
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }