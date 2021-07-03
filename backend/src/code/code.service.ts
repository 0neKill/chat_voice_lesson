import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {CodeEntity} from "./code.entity";
import {PhoneDto} from "../auth/dto/phoneDto";

@Injectable()
export class CodeService {
    private codeRepository: typeof CodeEntity;

    constructor(@InjectModel(CodeEntity) codeRepository: typeof CodeEntity) {
        this.codeRepository = codeRepository
    }

    async saveCode(userId: number): Promise<number> {
        const code = CodeService.createCode(9999, 1000);
        await this.codeRepository.create({code, userId});
        return code;
    }

    async checkCodeAndDestroy(code: number, id: number) {
    return await this.codeRepository.destroy({
            where: {
                code: code,
                userId: id
            }
        })
    }

    private static createCode(max: number, min: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

}