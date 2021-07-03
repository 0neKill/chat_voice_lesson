import {Body, Controller, Get, Post, Query, Req, Res, UseGuards} from "@nestjs/common";
import GithubGuard from "../common/guards/github.guard";
import {User} from "../common/decorators/User";
import {UserResponse} from "./dto/userResponse";
import {PhoneDto} from "./dto/phoneDto";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "../common/guards/jwt.guard";

@Controller('auth')
export default class AuthController {

    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService
    }

    @UseGuards(GithubGuard)
    @Get('/login')
    loginByGithub(@User() user: UserResponse) {
        return;
    }

    @UseGuards(GithubGuard)
    @Get("/github/callback")
    async githubCallback(@User() user: UserResponse, @Res({passthrough: true}) response) {
        response.cookie('token', user.token, {
            maxAge: 603800,
            httpOnly: true,
        });
        return `<script>window.opener.postMessage('${JSON.stringify(user)}','*');window.close();</script>`;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/sms')
    phone(@Query('phone') phone: string, @User() user) {
        return this.authService.phone(phone, user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/sms/activate')
    sms(@Query('sms') sms: string, @User() user) {
        return this.authService.sms(sms, user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    me(@User() user) {
        return this.authService.me(user.id);
    }

}