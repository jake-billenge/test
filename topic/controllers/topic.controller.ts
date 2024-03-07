import { Body, Controller, Get, Post, Query, Render, Scope } from '@nestjs/common';
import { AbstractTopicController } from '@src/topics/controllers/abstract-topic.controller';
import { TopicDto } from '@src/topics/dto/topic.dto';
import { TopicInsertionService } from '@src/topics/services/topics/topic-insertion.service';

@Controller({
    path: '/topics',
    scope: Scope.REQUEST,
})
export class TopicController extends AbstractTopicController {
    public constructor(private readonly topicInsertionService: TopicInsertionService) {
        super();
    }

    @Get(['/new', '/{idx}/edit'])
    @Render('topics/form.ejs')
    public async getForm() {}

    @Post('')
    public async insertTopic(@Body() topicDto: TopicDto) {
        return await this.topicInsertionService.index(topicDto);
    }
}
