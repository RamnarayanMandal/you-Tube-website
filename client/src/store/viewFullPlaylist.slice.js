import {createSlice} from '@reduxjs/toolkit'

const viewFullPlaylistSlice = createSlice(
    {
        name:'viewFullPlaylist',
        initialState:0,
        reducers:{
            viewFullPlaylist: (state, action) => {
                console.log(action)
                return action.payload;
            }
        }
        }
)

export const viewFullPlaylistActions = viewFullPlaylistSlice.actions;

export default viewFullPlaylistSlice;