import { AbstractRepository } from '@src/common/repositories/abstract-repository.service';
import { TopicEntity } from '@src/topics/entities/topic.entity';
import { DatabaseConnectionService } from '@src/common/services/database-connection.service';
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class TopicRepository extends AbstractRepository<TopicEntity> {
    public constructor(databaseConnectionService: DatabaseConnectionService) {
        super(TopicEntity, databaseConnectionService);
    }
}
