import { Module } from '@nestjs/common';
import { CommentsController } from 'src/comments/comments.controller';
import { CommentsService } from 'src/comments/comments.service';
import { PrismaService } from 'src/prisma.service';
import { KafkaService } from './kafka.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService, KafkaService],
})
export class CommentsModule {}
