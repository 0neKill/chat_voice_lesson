import {combineReducers, configureStore, Store} from '@reduxjs/toolkit';
import roomsReducer, {IRoomsSliceState} from "./slices/roomsSlice";
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import userReducer,{IUSerSliceState} from "./slices/userSlice";
//
//
// // type IReducerMain = ReturnType<typeof reducers>

export type IReducerMain = {
    rooms: IRoomsSliceState,
    user: IUSerSliceState
}
//
const reducers = combineReducers<IReducerMain>({
    rooms: roomsReducer,
    user: userReducer
})

const hydrate = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        }
        if (state.count) nextState.count = state.count // preserve count value on client side navigation
        return nextState
    } else {
        return reducers(state, action)
    }
}

const makeStore = (): Store<IReducerMain> => {
    return configureStore({
        reducer: hydrate
    });
}


export const wrapper = createWrapper<Store<IReducerMain>>(makeStore)
