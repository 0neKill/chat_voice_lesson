import {Module} from "@nestjs/common";
import {RoomController} from "./room.controller";
import {RoomService} from "./room.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {RoomEntity} from "./room.entity";

@Module({
    controllers: [RoomController],
    providers: [RoomService],
    imports: [SequelizeModule.forFeature([RoomEntity])],
    exports: [RoomService]
})
export class RoomModule {
}