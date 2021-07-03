import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import AuthModule from "./auth/auth.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {UserEntity} from "./user/user.entity";
import UserModule from "./user/user.module";
import FileModule from "./file/file.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";
import CodeModule from "./code/code.module";
import {CodeEntity} from "./code/code.entity";
import TokenModule from "./token/token.module";
import {RoomModule} from "./room/room.module";
import {RoomEntity} from "./room/room.entity";
import {SocketModule} from "./socket/socket.module";


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            models: [UserEntity, CodeEntity, RoomEntity],
            autoLoadModels: true,
            logging: false
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static', 'photos'),
        }),
        AuthModule,
        UserModule,
        FileModule,
        CodeModule,
        TokenModule,
        RoomModule,
        SocketModule,
        ConfigModule,
    ],
})
export default class AppModule {

}

