import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
    name: "video",
    initialState: {video:0},
    reducers: {
        getvideo: (state, action) => {
            return action.payload;
        }
    }
})

export const videoActions = videoSlice.actions;

export default videoSlice;