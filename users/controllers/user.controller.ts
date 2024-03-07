import { Controller, Get, Query, Render } from '@nestjs/common';
import { UserListService } from '@src/modules/users/services/user-list.service';
import { UserListDto } from '@src/modules/users/dtos/user-list.dto';

@Controller('users')
export class UserController {
    public constructor(private readonly userListService: UserListService) {}
    @Get('')
    @Render('users/user-list.ejs')
    public async getUsers(@Query() req: UserListDto) {
        return await this.userListService.index(req);
    }
}
