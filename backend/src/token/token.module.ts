import {forwardRef, Module} from "@nestjs/common";
import {TokenService} from "./token.service";
import {JwtStrategy} from "./token.stratege";
import AuthModule from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";

console.log(process.env.PRIVATE_KEY)
@Module({
    providers: [TokenService, JwtStrategy],
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('PRIVATE_KEY'),
                signOptions: {expiresIn: '60h'}
            }),
            inject: [ConfigService],
        })
    ],
    exports: [
        TokenService,
        JwtModule
    ]
})
export default class TokenModule {
}
