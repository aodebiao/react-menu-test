import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store";


export interface TabState{
    curTab:any[]
    currentTab?:string |undefined
    status?:'idle' | 'loading'
    reloadPath:string // 需要刷新的tab路径
}

const initialState:TabState = {
    curTab:[],
    reloadPath:'null'
}

export const demoAsync = createAsyncThunk('demo/fetch-data',async (data) =>{
    const response = await new Promise<{data:any}>(resolve =>{
        setTimeout(()=> resolve({data}),200)
    })
    return response.data
})

export const tabSlice = createSlice({
    name: "tabSlice",
    initialState,
    reducers:{
        setTabs:(state,action) =>{
            state.curTab = action.payload
        },
        setCurrentTab:(state,action)=>{
            state.currentTab = action.payload
        },
        setReloadPath:(state,action) =>{
            state.reloadPath = action.payload
        }
    }
})

export const selectTabs = (state:RootState) => state.tab.curTab
export const selectCurrentTab = (state:RootState) => state.tab.currentTab
export const selectReloadPath = (state:RootState) => state.tab.reloadPath

export const {setTabs,setCurrentTab,setReloadPath} = tabSlice.actions
export default tabSlice.reducer