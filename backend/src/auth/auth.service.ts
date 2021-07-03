import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {CodeService} from "../code/code.service";
import {UserService} from "../user/user.service";


@Injectable()
export class AuthService {
    private codeService: CodeService;

    constructor(codeService: CodeService, private userService: UserService) {
        this.codeService = codeService;
    }

    async phone(phone: string, id: number) {
        if (phone) {
            return await this.codeService.saveCode(id);
        } else {
            throw new HttpException('Укажите телефон', HttpStatus.BAD_REQUEST)
        }
    }

    async sms(sms: string, id: number) {
        if (sms) {
            const code = await this.codeService.checkCodeAndDestroy(Number(sms), id);
            if (code === 1) {
                await this.userService.updateFiled('isActive', true, {where: {id: id}})
                return;
            }
            throw new HttpException('Нет такого кода', HttpStatus.BAD_REQUEST)
        } else {
            throw new HttpException('Укажите код', HttpStatus.BAD_REQUEST)
        }
    }

    async me(id: string) {
        return await this.userService.getUserById(Number(id), 'id');
    }
}