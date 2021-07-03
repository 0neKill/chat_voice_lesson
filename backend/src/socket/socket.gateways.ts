import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {SocketJoinDto} from "./dto/socketJoinDto";
import {RoomService} from "../room/room.service";
import {generateUserRoom, IRooms} from "../utils/generateUserRoom";
import {SocketCallDto} from "./dto/socketCallDto";

@WebSocketGateway()
export class SocketGateways {
    @WebSocketServer()
    server: Server;
    rooms: IRooms = {}
    roomService: RoomService;

    constructor(roomService: RoomService) {
        this.roomService = roomService;
    }

    handleConnection(@ConnectedSocket() client: Socket) {
        console.log('USER=', client.id)
        return true;
    }

    @SubscribeMessage('CLIENT@ROOM::USER_JOIN')
    async handleJoin(@MessageBody() dto: SocketJoinDto, @ConnectedSocket() client: Socket): Promise<void> {
        const user = {...dto.user, id: new Date().getMilliseconds()};
        this.rooms[client.id] = {roomId: dto.roomId, user: user}
        client.join(dto.roomId);
        const users = generateUserRoom(this.rooms, dto.roomId)
        this.server.to(dto.roomId).emit('SERVER@ROOM::USER_JOINED', users);
        this.server.emit('SERVER@ROOM::HOME', {users, roomId: dto.roomId})
        await this.roomService.updateField("listenerCount", users.length, {where: {id: dto.roomId}});
    }

    @SubscribeMessage('CLIENT@ROOM::CALL')
    async handlerCall(@MessageBody() dto: SocketCallDto, @ConnectedSocket() client: Socket) {
        client.broadcast.to(dto.roomId).emit('SERVER@ROOM::SIGNAL', {
            targetUserId: dto.targetUserId,
            callerUserId: dto.callerUserId,
            signal: dto.signal,
        })
    }

    @SubscribeMessage('CLIENT@ROOM::ANSWER')
    async handlerAnswer(@MessageBody() dto: SocketCallDto, @ConnectedSocket() client: Socket) {
        client.broadcast.to(dto.roomId).emit('SERVER@ROOM::ANSWER', {
            callerUserId: dto.callerUserId,
            signal: dto.signal,
        })
    }

    async handleDisconnect(@ConnectedSocket() client: Socket) {

        if (this.rooms[client.id]) {
            const {[client.id]: {user, roomId}, ...rooms} = this.rooms
            this.rooms = rooms;
            const users = generateUserRoom(this.rooms, roomId);
            this.server.emit('SERVER@ROOM::HOME', {users, roomId})
            await this.roomService.updateField("listenerCount", users.length, {where: {id: roomId}})
            client.to(roomId).emit('SERVER@ROOM::USER_LEAVE', user);
        }

        console.log('leave     ', client.id)
    }
}