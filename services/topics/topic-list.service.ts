import { AbstractTopicService } from '@src/topics/services/topics/abstract-topic.service';
import { Injectable } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class TopicListService extends AbstractTopicService {
    public constructor() {
        super();
    }
}
