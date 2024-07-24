import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";

import {combineReducers} from 'redux';
import userReducer from '@/store/slices/userSlice'
import tabReducer from '@/store/slices/tabSlice'
import appReducer from '@/store/slices/appSlice'





const reducers = combineReducers({
    user:userReducer,
    tab:tabReducer,
    app:appReducer,
})






export const store = configureStore({
    reducer:reducers,

})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>







