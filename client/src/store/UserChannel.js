import { createSlice } from "@reduxjs/toolkit";

const userChannelSlice = createSlice({
    name: "userChannel",
    initialState: {userChannel:0},
    reducers: {
        getuserChannel: (state, action) => {
            return action.payload;
        }
    }
})

export const UserChannelActions = userChannelSlice.actions;

export default userChannelSlice;