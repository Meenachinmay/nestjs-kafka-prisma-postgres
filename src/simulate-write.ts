import { KafkaService } from './kafka/kafka.service';
import { CommentsService } from './comments/comments.service';
import { PrismaService } from './prisma.service';

const kafkaService = new KafkaService(new CommentsService(new PrismaService()));

async function run() {
  const promises = [];
  for (let i = 0; i < 1000; i++) {
    const commentData = {
      content: `Comment ${i}`,
      rating: Math.floor(Math.random() * 5) + 1,
      eventId: 1,
    };
    promises.push(
      kafkaService.sendMessage('kafka-api-comments', {
        value: JSON.stringify(commentData),
      }),
    );
  }
  await Promise.all(promises);
}

run().catch(console.error);
