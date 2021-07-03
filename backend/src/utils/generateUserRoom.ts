import {SocketJoinDto} from "../socket/dto/socketJoinDto";

export interface IRooms {
    [key: string]: SocketJoinDto
}

export const generateUserRoom = (rooms: IRooms, roomId: string) => (
    Object.values(rooms)
        .filter(item => item.roomId === roomId)
        .map(item => ({...item.user, roomId: roomId}))

)

