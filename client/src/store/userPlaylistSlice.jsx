import { createSlice } from "@reduxjs/toolkit";
const userPlaylistSlice = createSlice({
    name: "userplaylist",
    initialState:0,
    reducers: {
        getuserPlaylist: (state, action) => {
            return  action.payload; // Update state immutably
        }
    }
});



export const userPlaylistActions = userPlaylistSlice.actions;

export default userPlaylistSlice;