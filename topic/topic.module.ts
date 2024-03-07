import { Module } from '@nestjs/common';
import { TopicController } from '@src/topics/controllers/topic.controller';
import { TopicRepository } from '@src/topics/repositories/topic.repository';
import { TopicInsertionService } from '@src/topics/services/topics/topic-insertion.service';

@Module({
    controllers: [TopicController],
    providers: [
        /* services */
        TopicInsertionService,

        /* repositories */
        TopicRepository,
    ],
})
export class TopicModule {}
