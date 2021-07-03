import {UserResponse} from "../../auth/dto/userResponse";

export class SocketJoinDto {
     roomId: string
    readonly user: UserResponse
}