import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {UserEntity} from "./user.entity";
import {UserService} from "./user.service";
import {CodeEntity} from "../code/code.entity";

@Module({
    imports: [SequelizeModule.forFeature([UserEntity, CodeEntity])],
    providers: [UserService],
    exports: [UserService]
})
export default class UserModule {
}