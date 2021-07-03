import {forwardRef, Module} from "@nestjs/common";
import {LocalStrategy} from "./auth.stratege";
import AuthController from "./auth.controller";
import {PassportModule} from "@nestjs/passport";
import UserModule from "../user/user.module";
import CodeModule from "../code/code.module";
import {AuthService} from "./auth.service";
import TokenModule from "../token/token.module";
import {ConfigModule} from "@nestjs/config";


@Module({
    imports: [
        PassportModule,
        UserModule,
        CodeModule,
        ConfigModule,
        TokenModule
    ],
    controllers: [AuthController],
    providers: [
        LocalStrategy,
        AuthService,
    ],
})
export default class AuthModule {

}
