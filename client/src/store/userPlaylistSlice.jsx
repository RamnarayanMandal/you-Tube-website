import { createSlice } from "@reduxjs/toolkit";
const userPlaylistSlice = createSlice({
    name: "userplaylist",
    initialState:0,
    reducers: {
        getuserPlaylist: (state, action) => {
            // console.log(state,action);
            return  action.payload; 
        },
        deleteuserPlaylist: (state, action) => {
            return state.filter(playlist => playlist._id !== action.payload);
        }
        ,
        adduserPlaylist: (state, action) => {
            return [...state, action.payload]; 
        }

    }
});



export const UserPlaylistActions = userPlaylistSlice.actions;

export default userPlaylistSlice;