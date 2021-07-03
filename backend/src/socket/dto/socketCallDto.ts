import {UserEntity} from "../../user/user.entity";

export class SocketCallDto {
    readonly targetUserId: string;
    readonly callerUserId: string;
    readonly roomId: string;
    readonly signal: string;
}