import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../types/user";


export interface IUSerSliceState {
    userData: IUser | null,
}

const initialState: IUSerSliceState = {userData: null}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<IUser>) => {
            state.userData = action.payload;
        }
    },
})
export const {addUser} = userSlice.actions

export default userSlice.reducer

