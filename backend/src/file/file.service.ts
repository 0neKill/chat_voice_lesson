import { Injectable} from "@nestjs/common";
import * as uuid from 'uuid';
import * as path from "path";
import * as fs from "fs";

@Injectable()
export default class FileService {

    async upload(file: any): Promise<string> {
        const fileName = uuid.v4() + file.originalname;
        const filePath = path.resolve(__dirname, '..', 'static', 'photos');
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, {recursive: true});
        }
        fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
        return process.env.HOST + '/' + fileName;

    }
}