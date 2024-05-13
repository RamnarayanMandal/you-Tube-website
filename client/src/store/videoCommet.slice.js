import { createSlice } from "@reduxjs/toolkit";

const videoCommentSlice = createSlice({
    name: "videoComment",
    initialState: {videoComment:[]},
    reducers: {
        getvideoComment: (state, action) => {
            return action.payload;
        },
        addComment:(state, action) => {
            return {...state, videoComment: [...state.videoComment, action.payload]}
        },
        deleteComment:(state, action) => {
            return {...state, videoComment: state.videoComment.filter(comment => comment.id!== action.payload)}
        }
    }
})


export const videoCommentActions = videoCommentSlice.actions;

export default videoCommentSlice.reducer;