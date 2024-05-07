import { createSlice } from "@reduxjs/toolkit";

const getUserUploadedVideoSlice = createSlice({
    name: "userUploadedVideo",
    initialState: { video: [] },
    reducers: {
        getUserUploadedVideo: (state, action) => {
             console.log(action.payload)
            return action.payload;
        },
        addVideo: (state, action) => {
            console.log(action.payload)
            return { ...state, video: [...state.video, action.payload] };
        },
        deleteVideo: (state, action) => {
            return { ...state, video: state.video.filter(video => video._id !== action.payload) };
        }
    }
});

export const UserUploadedVideoActions = getUserUploadedVideoSlice.actions;

export default getUserUploadedVideoSlice.reducer;
