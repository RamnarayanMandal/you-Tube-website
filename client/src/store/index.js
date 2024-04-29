import {configureStore} from '@reduxjs/toolkit'
import loginSlice from './Login.slice';
import singupSlice from './singup.slice';
import userChannelSlice from './UserChannel';



const youtubestore = configureStore({
    reducer: {
       login:loginSlice.reducer,
       singup:singupSlice.reducer,
       userChannel:userChannelSlice.reducer
    }
})

export default youtubestore;