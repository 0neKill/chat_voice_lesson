import {NestFactory} from "@nestjs/core";
import AppModule from "./app.module";
import * as cookieParser from "cookie-parser";
import {HttpExceptionFilter} from "./common/filters/errorPage";
import {IoAdapter} from "@nestjs/platform-socket.io";

(async function () {
    const PORT = process.env.PORT || 3001;
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter());

    app.use(cookieParser());
    app.enableCors({
        origin: process.env.CLIENT_URL,
        credentials: true
    });
    // app.useWebSocketAdapter(new IoAdapter(app));
    await app.listen(PORT, () => {
        console.log(`Server is running... ${PORT}`);
    })
})()