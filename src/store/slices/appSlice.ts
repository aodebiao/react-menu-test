import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store";


export interface AppState {
    theme:string
    collapse:boolean
    menuMode:'horizontal' | 'vertical'
}


const initialState:AppState = {
    collapse:false,
    theme:'dark',
    menuMode:'horizontal'
}

export const appSlice = createSlice({
    name:'app',
    initialState,
    reducers:{
        setTheme:(state,action)=>{
            state.theme = action.payload
        },
        setCollapse:(state,action)=>{
            state.collapse = action.payload
        },
        setMenuMode:(state,action)=>{
            state.menuMode = action.payload
        }
    }
})


export const selectTheme = (state:RootState) => state.app.theme
export const selectCollapse = (state:RootState) => state.app.collapse
export const selectMenuMode = (state:RootState) => state.app.menuMode

export const {
    setTheme,
    setCollapse,
    setMenuMode
} = appSlice.actions;

export default appSlice.reducer