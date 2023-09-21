import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment() {
    console.log('writing in database');
    return this.prismaService.comment.create({
      data: {
        content: 'comment',
        rating: 4,
        eventId: 1,
      },
    });
  }
}
