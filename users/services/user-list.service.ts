import { Injectable, Scope } from '@nestjs/common';
import { UserAbstractService } from '@src/modules/users/services/user-abstract.service';
import { UserRepository } from '@src/modules/users/repositories/user.repository';
import { UserListDto } from '@src/modules/users/dtos/user-list.dto';
import { PaginationService } from '@src/globals/services/pagination.service';
import { UserEntity } from '@src/modules/users/entities/user.entity';
import * as dayjs from 'dayjs';

@Injectable({ scope: Scope.REQUEST })
export class UserListService extends UserAbstractService {
    private req: UserListDto;
    private readonly limit = 20;

    public constructor(private readonly userRepository: UserRepository, private readonly paginationService: PaginationService) {
        super();
    }

    public async index(req: UserListDto) {
        this.req = req;

        const numberOfUsers = await this.userRepository.getNumberOfUsers();

        const users = await this.getUsers(numberOfUsers);

        const pagination = this.getPagination(20);

        return {
            req,
            users,
            pagination,
        };
    }

    private async getUsers(numberOfUsers: { cnt: number }) {
        const params = {
            limit: this.limit,
            offset: (this.req.page - 1) * this.limit,
        };
        let users = await this.userRepository.getUserList(params);
        users = users.map((user, key: number) => {
            user['no'] = numberOfUsers.cnt - params.offset - key;
            user['signup_date'] = dayjs(user['created_at']).format('YYYY-MM-DD HH:mm:ss');
            return user;
        });

        return users;
    }

    private getPagination(count: number) {
        const config = {
            totalRows: count,
            limit: this.limit,
            current: this.req.page,
            numberOfButtons: 5,
            url: '/users',
            query: { ...this.req },
        };
        return this.paginationService.get(config);
    }
}
