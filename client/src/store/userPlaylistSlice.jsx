import { createSlice } from "@reduxjs/toolkit";

const userPlaylistSlice = createSlice({
    name: "userplaylist",
    initialState: [], // Change initial state to an empty array
    reducers: {
        getuserPlaylist: (state, action) => {
            // console.log(state,action);
            return action.payload; 
        },
        deleteuserPlaylist: (state, action) => {
            return state.filter(playlist => playlist._id !== action.payload);
        },
        adduserPlaylist: (state, action) => {
            return [...state, action.payload]; 
        },
        addVideo:(state, action) => {
            return [...state, action.payload];
        },
        removeVideo:(state, action) => {
            return state.filter(video => video._id !== action.payload);
        }
    
    }
});

export const UserPlaylistActions = userPlaylistSlice.actions;

export default userPlaylistSlice.reducer; 
