import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaService } from './kafka/kafka.service';
import { PrismaService } from './prisma.service';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [CommentsModule],
  controllers: [AppController, CommentsController],
  providers: [AppService, KafkaService, PrismaService, CommentsService],
})
export class AppModule {}
