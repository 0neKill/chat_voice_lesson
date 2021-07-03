import {Module} from "@nestjs/common";
import {CodeService} from "./code.service";
import {CodeEntity} from "./code.entity";
import {UserEntity} from "../user/user.entity";
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
    providers: [CodeService],
    imports: [
        SequelizeModule.forFeature([CodeEntity, UserEntity])
    ],
    exports:[CodeService]
})
export default class CodeModule {
}