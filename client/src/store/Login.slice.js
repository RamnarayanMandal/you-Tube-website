import { createSlice} from '@reduxjs/toolkit'
import { LuOutdent } from 'react-icons/lu';


const loginSlice = createSlice({
    name:'login',
    initialState:{loginData:0},
    reducers: {
        LoginData: (state, action) => {
            return action.payload; 
        },
        Logout: (state, action) => {
            return { ...state, loginData: 0 };
        }
    
    }
})

export const loginActions = loginSlice.actions;

export default loginSlice;

