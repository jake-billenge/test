import { AbstractTopicService } from '@src/topics/services/topics/abstract-topic.service';
import { Injectable } from '@nestjs/common';
import { TopicDto } from '@src/topics/dto/topic.dto';
import { TopicRepository } from '@src/topics/repositories/topic.repository';
import { getRandomString } from '@src/common/utils/string.util';

@Injectable({ scope: Scope.REQUEST })
export class TopicInsertionService extends AbstractTopicService {
    private req: TopicDto;
    public constructor(private readonly topicRepository: TopicRepository) {
        super();
    }

    public async index(req: TopicDto) {
        this.req = req;

        await this.insertTopic();
    }

    private getTopicId() {
        let topicId = '';

        for (let i = 0; i < 100; i++) {
            topicId = getRandomString(10);
        }
    }

    private async insertTopic() {
        const data = {
            topic_id: 'ddd',
            name: this.req.name,
            description: this.req.description,
            allow_duplicates: this.req.allow_duplicates,
            choice_type: this.req.choice_type,
            topic_from: this.req.topic_from,
            topic_until: this.req.topic_until,
            status: this.req.status,
            handler_idx: 0,
        };
        await this.topicRepository.insert(data);
    }

    private async insertChoices() {
        for (const argument of arguments) {
        }
    }
}
