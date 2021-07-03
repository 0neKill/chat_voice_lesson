import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {RoomEntity} from "./room.entity";
import {CreateRoomDto} from "./dto/createRoomDto";

@Injectable()
export class RoomService {
    private roomRepository: typeof RoomEntity;

    constructor(@InjectModel(RoomEntity) roomRepository: typeof RoomEntity) {
        this.roomRepository = roomRepository;
    }

    async getRooms(): Promise<RoomEntity[]> {
        return this.roomRepository.findAll();
    }

    async updateField(field: keyof RoomEntity, value: number, query) {
        return this.roomRepository.update({[field]: value}, query)
    }

    async createRoom(dto: CreateRoomDto): Promise<RoomEntity> {
        try {
            return await this.roomRepository.create(dto)
        } catch (e) {
            throw new HttpException('Укажите данные', HttpStatus.BAD_REQUEST)
        }
    }

    async deleteRoom(id: string) {
        try {
            const item = await this.deleteById(Number(id));
            if (item !== 1) {
                return;
            }
            // throw new HttpException('Указан неверный id', HttpStatus.BAD_REQUEST)
        } catch (e) {
            throw  new HttpException('Неуказан id', HttpStatus.BAD_REQUEST)
        }
    }

    async getRoomById(id: string): Promise<RoomEntity> {
        return this.roomRepository.findOne({where: {id: Number(id)}});
    }

    private async deleteById(id: number): Promise<number> {
        return await this.roomRepository.destroy({where: {id}});
    }
}