import {
  Injectable,
  OnModuleInit,
  Logger,
  OnModuleDestroy,
} from '@nestjs/common';
import { Kafka, logLevel } from 'kafkajs';
import { CommentsService } from 'src/comments/comments.service';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);
  private kafka: Kafka;
  private producer;
  private consumer;

  constructor(private readonly commentService: CommentsService) {
    this.kafka = new Kafka({
      clientId: 'kafka-app',
      brokers: ['kafka:9092'],
      logLevel: logLevel.INFO,
    });
  }

  async onModuleInit() {
    try {
      console.log('Initializing Kafka producer...');
      this.producer = this.kafka.producer();
      await this.producer.connect();
      console.log('Kafka producer initialized\n');

      console.log('Initializing Kafka consumer...');
      this.consumer = this.kafka.consumer({ groupId: 'kafka-api-group' });
      await this.runConsumer();
      console.log('Kafka consumer initialized');
    } catch (error) {
      this.logger.error(`Error initializing Kafka Consumer: ${error.message}`);
    }
  }

  async onModuleDestroy() {
    // This will run when your application shuts down
    try {
      await this.producer.disconnect();
      console.log('Kafka producer disconnected');
    } catch (error) {
      this.logger.error(`Error disconnecting Kafka producer: ${error.message}`);
    }
  }

  async sendMessage(topic: string, message: any) {
    if (!this.producer) {
      console.error('Producer not initialized');
      return;
    }
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
    } catch (error) {
      this.logger.error(`Error sending message: ${error.message}`);
    }
  }

  async runConsumer() {
    try {
      this.consumer = this.kafka.consumer({ groupId: 'kafka-api-groupB' });
      await this.consumer.connect();
      await this.consumer.subscribe({
        topic: 'kafka-api-comments',
        fromBeginning: true,
      });

      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          // here make the logic to save the data in database
          const commentData = JSON.parse(message.value);
          // take the commentData and save it in database using prisma service
          await this.commentService.createComment();
        },
      });
    } catch (error) {
      this.logger.error(`Error running consumer: ${error.message}`);
    }
  }
}
