import { AbstractRepository } from '@src/modules/abstract.repository';
import { UserEntity } from '@src/modules/users/entities/user.entity';
import { DatabaseConnectionService } from '@src/globals/services/database-connection.service';
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class UserRepository extends AbstractRepository<UserEntity> {
    public constructor(databaseConnectionService: DatabaseConnectionService) {
        super(UserEntity, databaseConnectionService);
    }

    public async getNumberOfUsers() {
        const query = `
            SELECT COUNT(*) AS cnt
            FROM users
        `;
        return await this.secondary.query(query).then((rows) => rows[0]);
    }

    public async getUserList(params: { limit: number; offset: number }): Promise<UserEntity[]> {
        const query = `
            SELECT idx, user_id, user_name, created_at
            FROM users
            ORDER BY idx DESC
            LIMIT ? OFFSET ?
        `;
        const bindings = [params.limit, params.offset];
        return await this.secondary.query(query, bindings);
    }
}
