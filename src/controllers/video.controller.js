import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudiner} from "../utils/cloudinary.js"



const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    
    const videos = await Video.find()
    if(!videos){
        throw new ApiError(400, "Videos not found")
    }
    res.status(200).json(
        new ApiResponse(
            200,
            videos,
            " All the Videos fetched successfully"
        )
        )
   
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description, isPublished, thumbnail } = req.body;
    if (!title) {
        throw new ApiError(400, "Title is required");
    }
    if (!description) {
        throw new ApiError(400, "Description is required");
    }

    if (!thumbnail) {
        throw new ApiError(400, "Thumbnail is required");
    }
    
    const videoPath = req.files?.videoFile?.[0]?.path;
    
    console.log("local video path " + videoPath);

    if (!videoPath) {
        throw new ApiError(400, "Video file is required");
    }

    const video = await uploadOnCloudiner(videoPath);

    if (!video || !video.url) {
        console.error("Video upload failed:", video && video.error ? video.error : "Unknown error");
        throw new ApiError(400, "Video upload failed. Please try again.");
    } else {
        console.log("Video uploaded successfully: ", video.url);
    }


    try {
        const createdVideo = await Video.create({
            title,
            thumbnail,
            description,
            duration: video.duration, // in seconds
            videoFile: video.url,
            isPublished,
            owner: req.user._id 
        });

        res.status(201).json(
            new ApiResponse(
                201,
                createdVideo,
                "Video created successfully"
            )
        );
    } catch (error) {
        console.error("Error getting video duration:", error);
       
    }
});


const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if (!videoId)
    {
        throw new ApiError(400, "Video ID is required");
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video does not exist");
    }
    
    res.status(200)
    .json(
        new ApiResponse(
            200,
            video,
            "Video retrieved successfully"
        )
    );


})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    
    console.log(`Video ${videoId}`)
    if (!videoId) {
        throw new ApiError(400, "Video ID is required");
    }

    const { title, description, thumbnail } = req.body;

    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (thumbnail) updateFields.thumbnail = thumbnail;

    
    const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        { $set: updateFields },
        { new: true } 
    );

    if (!updatedVideo) {
        throw new ApiError(404, "Video not found");
    }

    res.status(200).json(
        new ApiResponse(
            200,
            updatedVideo,
            "Video details updated successfully"
        )
    );
});

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!videoId){
        throw new ApiError(400, "Video ID is required");
    }
    const video = await Video.findByIdAndDelete(videoId?._id);
    if (!video) {
        throw new ApiError(404, "Video does not exist");
    }
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!videoId){
        throw new ApiError(400, "Video ID is required");
    }

   const {isPublished} = req.body

   if(!isPublished){
    throw new ApiError(400, "isPublished is required");
   }
   
    const video = await Video.findByIdAndUpdate(
        videoId,
        { $set: {isPublished} },
        { new: true } 
    );

    if(!video){
        throw new ApiError(404, "Video doesnot exit");
    }
    res.status(200).json(
        new ApiResponse(
            200,
            video,
            "Video published/unpublished successfully"
        ))
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}