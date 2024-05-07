import {configureStore} from '@reduxjs/toolkit'
import loginSlice from './Login.slice';
import singupSlice from './singup.slice';
import userChannelSlice from './UserChannel';
import videoSlice from './getAllvideo.slice';
import viewFullPlaylistSlice from './viewFullPlaylist.slice';
import userPlaylistSlice from './userPlaylistSlice';
import getUserUploadedVideoSlice from './getUserUploadedVideo.slice';





const youtubestore = configureStore({
    reducer: {
       login:loginSlice.reducer,
       singup:singupSlice.reducer,
       userChannel:userChannelSlice.reducer,
       video:videoSlice.reducer,
       userplaylist:userPlaylistSlice.reducer,
       viewFullPlaylist:viewFullPlaylistSlice.reducer,
       userUploadedVideo:getUserUploadedVideoSlice

    }
})

export default youtubestore;