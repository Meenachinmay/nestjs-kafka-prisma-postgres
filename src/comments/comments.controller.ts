import { Controller, Get } from '@nestjs/common';
import { KafkaService } from 'src/kafka/kafka.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Get('/run-test')
  async runTest() {
    const promises = [];
    for (let i = 0; i < 10000; i++) {
      const commentData = {
        content: `Comment ${i}`,
        rating: Math.floor(Math.random() * 5) + 1,
        eventId: 1,
      };
      promises.push(
        this.kafkaService.sendMessage('kafka-api-comments', {
          commentData,
        }),
      );
    }
    await Promise.all(promises);
  }
}
