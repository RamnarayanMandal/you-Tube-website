import { createSlice } from "@reduxjs/toolkit";

const singupSlice = createSlice({
    name: "singup",
    initialState: {
        name: "",
        email: "",
        password: ""
    },
    reducers: {
        singup: (state, action) => {
            return action.payload;
        }
    }
})

export const singupActions = singupSlice.actions;

export default singupSlice;