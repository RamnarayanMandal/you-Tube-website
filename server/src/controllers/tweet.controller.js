import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweets.module.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
   const  {content}=req.body
   if(!content){
    throw new ApiError(400, "Content is required")
   }
   const tweet = await Tweet.create({
       content,
       user: req.user?._id
   })
   if(!tweet){
    throw new ApiError(500, "Tweet creation failed. Please try again")
   }
   res.status(201).json(new ApiResponse(201, {tweet}, "Tweet created successfully"))
})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    const { userId } = req.params;
    if(!userId){
        throw new ApiError(400, "User id is required")
    }
    if(!isValidObjectId(userId)){
        throw new ApiError(400, "Invalid user id")
    }
    const tweets = await Tweet.find({user: userId})
    if(!tweets){
        throw new ApiError(500, "Tweets fetching failed. Please try again")
    }
    res.status(200).json(new ApiResponse(200, tweets, "Tweets fetched successfully"))
})
const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const { tweetId } = req.params;
    if(!tweetId){
        throw new ApiError(400, "Tweet id is required")
    }
    const {content}= req.body
    if(!content){
        throw new ApiError(400, "Content is required")
    }
    const tweet = await Tweet.findByIdAndUpdate(
        tweetId,
        { $set: {content} },
        { new: true }
    )
    if(!tweet){
        throw new ApiError(500, "Tweet update failed. Please try again")
    }
    res.status(200).json(new ApiResponse(200, tweet, "Tweet updated successfully"))
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const { tweetId } = req.params;
    if(!tweetId){
        throw new ApiError(400, "Tweet id is required")
    }
    const tweet = await Tweet.findByIdAndDelete(tweetId)
    if(!tweet){
        throw new ApiError(500, "Tweet deletion failed. Please try again")
    }
    res.status(200).json(new ApiResponse(200, tweet, "Tweet deleted successfully"))
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}