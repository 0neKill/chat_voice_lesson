// import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from "@nestjs/common";

// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//     catch(exception: HttpException, host: ArgumentsHost) {
//         const ctx = host.switchToHttp();
//         const response = ctx.getResponse<Response>() as any;
//         const request = ctx.getRequest<Request>();
//         const status = exception.getStatus();
// //         if (exception.code === "ENOENT") {
// //             response
// //                 .status(404)
// //                 .json({
// //                     statusCode: 404,
// //                     timestamp: new Date().toISOString(),
// //                 });
// //
// //         }
//         response
//             .status(status)
//             .json({
//                 statusCode: status,
//                 timestamp: new Date().toISOString(),
//                 path: request.url,
//             });
//     }
// }
import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from "@nestjs/common";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: any, host: ArgumentsHost): any {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>() as any;
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        if (exception.code === "ENOENT") {
           return  response
                .status(404)
                .json({
                    statusCode: 404,
                    timestamp: new Date().toISOString(),
                });

        }
        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
            });
    }
}