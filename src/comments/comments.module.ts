import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { PrismaService } from 'src/prisma.service';
import { KafkaService } from 'src/kafka/kafka.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService, KafkaService],
})
export class CommentsModule {}
