import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {UserEntity} from "./user.entity";
import {UserResponse} from "../auth/dto/userResponse";

@Injectable()
export class UserService {
    private userRepository: typeof UserEntity

    constructor(@InjectModel(UserEntity) userRepository: typeof UserEntity) {
        this.userRepository = userRepository;
    }

    async createUser(dto: UserResponse): Promise<UserEntity> {
        return await this.userRepository.create(dto, {raw: true});
    }

    async getUserById(id: number, search: 'id' | 'gitId'): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: {[search]: id},
            raw: true
        })
    }

    async updateFiled(field: keyof UserEntity, value: string | number | boolean, query) {
        return this.userRepository.update({[field]: value}, query)
    }


}