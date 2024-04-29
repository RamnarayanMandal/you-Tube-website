import { createSlice } from "@reduxjs/toolkit";

const singupSlice = createSlice({
    name: "singup",
    initialState: {singupData:0},
    reducers: {
        singup: (state, action) => {
            return action.payload;
        }
    }
})

export const singupActions = singupSlice.actions;

export default singupSlice;