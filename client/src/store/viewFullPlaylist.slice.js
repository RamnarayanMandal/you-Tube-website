import {createSlice} from '@reduxjs/toolkit'

const viewFullPlaylistSlice = createSlice(
    {
        name:'viewFullPlaylist',
        initialState:{viewFullPlaylistData:0},
        reducers:{
            viewFullPlaylist: (state, action) => {
                return action.payload;
            }
        }
        }
)

export const viewFullPlaylistActions = viewFullPlaylistSlice.actions;

export default viewFullPlaylistSlice;