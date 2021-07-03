import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Profile, Strategy} from "passport-github2";
import {UserResponse} from "./dto/userResponse";
import {UserService} from "../user/user.service";
import {TokenService} from "../token/token.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    private userService: UserService;
    private tokenService: TokenService;

    constructor(userService: UserService, tokenService: TokenService) {
        super({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CLIENT_CALLBACK,
        });
        this.userService = userService;
        this.tokenService = tokenService;

    }

    async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<UserResponse> {
        const candidate = await this.userService.getUserById(Number(profile.id), 'gitId');
        if (candidate) return new UserResponse({...candidate, token: this.tokenService.createToken(candidate)});
        const user = await this.userService.createUser({
            gitId: Number(profile.id),
            userName: profile.username,
            fullName: profile.displayName,
            avatarUrl: profile.photos[0].value,
        });
        return new UserResponse({...user, token: this.tokenService.createToken(user)});
    }
}


