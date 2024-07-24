import {createSlice} from "@reduxjs/toolkit";
import {UserInfo} from "@/app_models/user";
import {RootState} from "@/store";

export interface UserState {
    UserInfo: UserInfo & { is_oidc_user: boolean }
}

export const userInfo:UserInfo ={
    username: '',
    displayName: '',
    permission: [],
    token: '',
}
const initialState: UserState = {
    UserInfo:{...userInfo,is_oidc_user:false},
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.UserInfo = action.payload
        }
    }
})

export const {setUserInfo} = userSlice.actions
export const selectUserInfo = (state:RootState) => state.user.UserInfo
export default userSlice.reducer