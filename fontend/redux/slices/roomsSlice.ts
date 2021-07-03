import {createAsyncThunk, createSlice, PayloadAction, SliceCaseReducers} from "@reduxjs/toolkit";
import {$api} from "../../http";
import {HYDRATE} from "next-redux-wrapper";
import {IReducerMain} from "../store";
import {IUser} from "../../types/user";

interface IRoom {
    id: string,
    title: string,
    listenerCount: number
}

export interface IRoomsSliceState {
    items: IRoom[],
    loading: boolean,
}

export const fetchCreateRoom = createAsyncThunk(
    'room/fetchCreateRoom',
    async (data: { title: string, speakers: string }, thunkAPI) => {
        try {
            thunkAPI.dispatch(loading(true))
            const response = await $api.post<{ id: string, title: string, listenerCount: number }>('/rooms', data);
            return response.data
        } catch (e) {
            console.log(1)
            throw Error('Ошибка при создании комнаты')
        } finally {
            thunkAPI.dispatch(loading(false))

        }

    }
)

const initialState: IRoomsSliceState = {items: [], loading: false}

// interface ICaseReducers extends SliceCaseReducers<IRoomsSliceState> {
//     addRoom: (state: IRoomsSliceState, action: PayloadAction<IRoom>) => any;
// }

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        // addRoom: (state, action: PayloadAction<IRoom>) => {
        //     state.items.push(action.payload)
        // },
        loading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        addRooms: (state, action: PayloadAction<IRoom[]>) => {
            state.items = action.payload;
        },
        setRoomsListener: (state, action: PayloadAction<{ users: IUser[], roomId: string }>) => {
            state.items = state.items.map(rooms => {
                if (+rooms.id === +action.payload.roomId) {
                    rooms.listenerCount = action.payload.users.length;
                }
                return rooms
            })
        },
    },
    // extraReducers: {
    //     [fetchCreateRoom.fulfilled.type]: (state, action: PayloadAction<IRoom>) => {
    //         state.rooms.push(action.payload)
    //     }
    // }
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateRoom.fulfilled.type, (state, action: PayloadAction<IRoom>) => {
                state.items.push(action.payload);
            })
        // .addCase(HYDRATE as string, (state, action: PayloadAction<IReducerMain>) => {
        //     return action.payload.rooms;
        // })
    },
})
export const {loading, addRooms, setRoomsListener} = roomsSlice.actions

export default roomsSlice.reducer

