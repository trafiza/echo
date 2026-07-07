import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesGateway } from './messages.gateway';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gateway: MessagesGateway,
  ) {}

  async create(
    channelId: string,
    userId: string,
    createMessageDto: CreateMessageDto,
  ) {
    const message = await this.prisma.message.create({
      data: {
        content: createMessageDto.content,
        channelId,
        authorId: userId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    this.gateway.sendMessage(channelId, message);

    return message;
  }

  async findAll(channelId: string) {
    return this.prisma.message.findMany({
      where: {
        channelId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }
}