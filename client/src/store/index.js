import {configureStore} from '@reduxjs/toolkit'
import loginSlice from './Login.slice';
import singupSlice from './singup.slice';



const youtubestore = configureStore({
    reducer: {
       login:loginSlice.reducer,
       singup:singupSlice.reducer,
    }
})

export default youtubestore;