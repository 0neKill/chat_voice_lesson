import {Body, Controller, Delete, Get, Param, Post, UseFilters, UseGuards} from "@nestjs/common";
import {RoomService} from "./room.service";
import {CreateRoomDto} from "./dto/createRoomDto";
import {JwtAuthGuard} from "../common/guards/jwt.guard";
import {HttpExceptionFilter} from "../common/filters/errorPage";
@Controller('/rooms')
export class RoomController {
    private roomService: RoomService;

    constructor(roomService: RoomService) {
        this.roomService = roomService;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/')
    getRooms() {
        return this.roomService.getRooms();
    }

    @UseGuards(JwtAuthGuard)
    @Post('/')
    createRoom(@Body() dto: CreateRoomDto) {
        return this.roomService.createRoom(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getRoomById(@Param('id') id: string) {
        return this.roomService.getRoomById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    deleteRoom(@Param('id') id: string) {
        return this.roomService.deleteRoom(id);
    }

}