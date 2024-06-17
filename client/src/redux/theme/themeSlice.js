import { createSlice } from "@reduxjs/toolkit";

const initialState={
    theme:0,
};

const themeSlice=createSlice({
    name:"theme",
    initialState,
    reducers:{
        toggletheme:(state)=>{
            state.theme=!state.theme;
        },
    }
})

export const {toggletheme} = themeSlice.actions;
export default themeSlice.reducer;