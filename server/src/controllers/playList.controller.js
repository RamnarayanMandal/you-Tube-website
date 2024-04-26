import { Playlist } from "../models/playList.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        throw new ApiError(400, "Name or description is required");
    }

    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user._id
    });

    if (!playlist) {
        throw new ApiError(500, "Can't create playlist, something went wrong");
    }

    return res.status(201).json(new ApiResponse(201, playlist, "Playlist created successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        throw new ApiError(400, "User ID is required");
    }

    const playlists = await Playlist.find({ owner: userId });
    if (!playlists) {
        throw new ApiError(404, "Playlists not found");
    }

    return res.status(200).json(new ApiResponse(200, playlists, "Playlists fetched successfully"));
});

const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    if (!playlistId) {
        throw new ApiError(400, "Playlist ID is required");
    }

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    return res.status(200).json(new ApiResponse(200, playlist, "Playlist fetched successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;
    if (!playlistId || !videoId) {
        throw new ApiError(400, "Both playlistId and videoId are required");
    }

    const playlist = await Playlist.findByIdAndUpdate(playlistId, { $push: { videos: videoId } });
    if (!playlist) {
        throw new ApiError(500, "Video not added to playlist");
    }

    return res.status(201).json(new ApiResponse(201, playlist, "Video added to playlist successfully"));
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;
    if (!playlistId || !videoId) {
        throw new ApiError(400, "Both playlistId and videoId are required");
    }

    const playlist = await Playlist.findByIdAndUpdate(playlistId, { $pull: { videos: videoId } });
    if (!playlist) {
        throw new ApiError(500, "Video not removed from playlist");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Video removed from playlist successfully"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    if (!playlistId) {
        throw new ApiError(400, "Playlist ID is required");
    }

    const playlist = await Playlist.findByIdAndDelete(playlistId);
    if (!playlist) {
        throw new ApiError(500, "Playlist not deleted");
    }

    return res.status(200).json(new ApiResponse(200, playlist, "Playlist deleted successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const { name, description } = req.body;
    if (!playlistId) {
        throw new ApiError(400, "Playlist ID is required");
    }
    if (!name && !description) {
        throw new ApiError(400, "Name or description is required");
    }

    const playlist = await Playlist.findByIdAndUpdate(playlistId, { name, description }, { new: true });
    if (!playlist) {
        throw new ApiError(500, "Playlist not updated");
    }

    return res.status(200).json(new ApiResponse(200, playlist, "Playlist updated successfully"));
});

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
};
