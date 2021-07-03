import {Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import FileService from "./file.service";
import {User} from "../common/decorators/User";

@Controller('file')
export default class FileController {
    private fileService: FileService;

    constructor(fileService: FileService) {
        this.fileService = fileService;
    }

    @UseInterceptors(FileInterceptor('photo'))
    @Post('/upload')
    upload(@UploadedFile() file) {
        return this.fileService.upload(file);
    }
}