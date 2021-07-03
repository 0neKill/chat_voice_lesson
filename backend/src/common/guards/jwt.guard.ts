// import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
// import {Observable} from "rxjs";
// import {TokenService} from "../../token/token.service";
import {ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {

        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        return super.canActivate(context);
    }
}


// @Injectable()
// export class JwtGuard implements CanActivate {
//     constructor(private tokenService: TokenService) {
//     }
//
//     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//         const req = context.switchToHttp().getRequest();
//
//         const token = req.headers['authorization'].split(' ')[1];
//         const verify_token = this.tokenService.verifyToken(token);
//         console.log(verify_token);
//         return undefined;
//     }
//
// }

