import { Module } from '@nestjs/common';
import { UserController } from '@src/modules/users/controllers/user.controller';
import { UserRepository } from '@src/modules/users/repositories/user.repository';
import { UserListService } from '@src/modules/users/services/user-list.service';

@Module({
    controllers: [UserController],
    providers: [
        /* services */
        UserListService,

        /* repositories */
        UserRepository,
    ],
})
export class UserModule {}
