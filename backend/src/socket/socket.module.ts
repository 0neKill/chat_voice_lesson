import {Module} from "@nestjs/common";
import {SocketGateways} from "./socket.gateways";
import {RoomModule} from "../room/room.module";

@Module({
    providers: [SocketGateways],
    imports: [RoomModule]
})
export class SocketModule {

}