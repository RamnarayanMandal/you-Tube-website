import { createSlice} from '@reduxjs/toolkit'


const loginSlice = createSlice({
    name:'login',
    initialState:{loginData:0},
    reducers: {
        LoginData: (state, action) => {
            console.log('state', state)
            console.log('action', action.payload)
            return action.payload;

           
        }
    
    }
})

export const loginActions = loginSlice.actions;

export default loginSlice;

